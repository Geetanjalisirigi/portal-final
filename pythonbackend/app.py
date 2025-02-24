import os
import io
import base64
import google.generativeai as genai
import logging
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pdf2image import convert_from_bytes
from dotenv import load_dotenv
import uvicorn
import traceback

# Load environment variables
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,  # Set to logging.INFO in production
    format="%(asctime)s - %(levelname)s - %(message)s",
)

if not GOOGLE_API_KEY:
    logging.error("Missing GOOGLE_API_KEY in environment variables.")
    raise ValueError("Missing GOOGLE_API_KEY in environment variables.")

# Configure Gemini AI
try:
    genai.configure(api_key=GOOGLE_API_KEY)
    logging.info("Gemini AI successfully configured.")
except Exception as e:
    logging.error(f"Gemini AI configuration failed: {e}")
    raise

# Initialize FastAPI App
app = FastAPI()

# Enable CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

def convert_pdf_to_image(pdf_bytes):
    """Convert the first page of a PDF to a base64-encoded image."""
    logging.info("Starting PDF to image conversion.")
    try:
        images = convert_from_bytes(pdf_bytes)
        if not images:
            logging.warning("No images extracted from PDF.")
            raise ValueError("No images extracted from the PDF.")

        first_page = images[0]
        img_byte_arr = io.BytesIO()
        first_page.save(img_byte_arr, format="JPEG")
        encoded_image = base64.b64encode(img_byte_arr.getvalue()).decode()

        logging.info("PDF successfully converted to image.")
        return encoded_image
    except Exception as e:
        logging.error(f"PDF processing error: {e}\n{traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"PDF processing error: {str(e)}")

def get_gemini_response(input_text, pdf_content, prompt):
    """Send job description and resume content to Gemini AI for evaluation."""
    logging.info("Sending data to Gemini AI for processing.")
    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content([input_text, pdf_content, prompt])

        if not response or not response.text:
            logging.warning("Empty response from Gemini AI.")
            raise ValueError("Received empty response from Gemini AI.")

        logging.info("Gemini AI processing completed successfully.")
        return response.text
    except Exception as e:
        logging.error(f"Gemini AI error: {e}\n{traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Gemini AI error: {str(e)}")

@app.post("/analyze-resume/")
async def analyze_resume(
    job_description: str = Form(...),
    resume: UploadFile = File(...),
    analysis_type: str = Form(...)
):
    """API Endpoint to analyze resume against job description."""
    logging.info(f"Received request for resume analysis - Type: {analysis_type}")

    try:
        if not resume.filename.endswith(".pdf"):
            logging.warning(f"Invalid file format: {resume.filename}")
            raise HTTPException(status_code=400, detail="Only PDF files are allowed.")

        # Convert PDF to image
        logging.info(f"Processing resume file: {resume.filename}")
        pdf_image_base64 = convert_pdf_to_image(await resume.read())

        # Define prompts
        prompts = {
            "summary": "Evaluate this resume against the job description and highlight strengths and weaknesses.",
            "match": "Compare this resume with the job description and provide a match percentage along with missing keywords.",
        }
        prompt = prompts.get(analysis_type)

        if not prompt:
            logging.warning(f"Invalid analysis type: {analysis_type}")
            raise HTTPException(status_code=400, detail="Invalid analysis type.")

        # Send data to Gemini AI
        pdf_content = {"mime_type": "image/jpeg", "data": pdf_image_base64}
        logging.info("Sending resume and job description for analysis.")
        result = get_gemini_response(job_description, pdf_content, prompt)

        logging.info("Resume analysis completed successfully.")
        return {"result": result}

    except HTTPException as e:
        logging.error(f"HTTP Exception: {e.detail}")
        raise e
    except Exception as e:
        logging.error(f"Unexpected error: {e}\n{traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

if __name__ == "__main__":
    logging.info("Starting FastAPI server on port 8000...")
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
