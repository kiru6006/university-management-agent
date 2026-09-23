import re
from typing import Dict, Any, Tuple

# Presidio / Regex-based PII Sanitizer for statutory DPDP & FERPA compliance
class PIISanitizer:
    def __init__(self):
        self.aadhaar_pattern = re.compile(r'\b\d{4}[-\s]?\d{4}[-\s]?\d{4}\b')
        self.pan_pattern = re.compile(r'\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b')
        self.phone_pattern = re.compile(r'\b(?:\+91|0)?[6789]\d{9}\b')
        self.credit_card_pattern = re.compile(r'\b(?:\d{4}[-\s]?){3}\d{4}\b')
        self.email_pattern = re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b')

    def sanitize_text(self, text: str) -> Tuple[str, Dict[str, Any]]:
        masked_text = text
        redacted_entities = {}

        # Mask Aadhaar
        if self.aadhaar_pattern.search(masked_text):
            redacted_entities["AADHAAR"] = True
            masked_text = self.aadhaar_pattern.sub("<REDACTED_AADHAAR_ID>", masked_text)

        # Mask PAN
        if self.pan_pattern.search(masked_text):
            redacted_entities["PAN"] = True
            masked_text = self.pan_pattern.sub("<REDACTED_PAN_ID>", masked_text)

        # Mask Credit Cards
        if self.credit_card_pattern.search(masked_text):
            redacted_entities["PAYMENT_CARD"] = True
            masked_text = self.credit_card_pattern.sub("<REDACTED_CARD_NUMBER>", masked_text)

        # Mask Phone Numbers
        if self.phone_pattern.search(masked_text):
            redacted_entities["PHONE_NUMBER"] = True
            masked_text = self.phone_pattern.sub("<REDACTED_PHONE>", masked_text)

        return masked_text, redacted_entities

pii_sanitizer = PIISanitizer()
