# AMP-Trust Pharmacy — Streamlit prototype

This folder contains the public-safe Streamlit interface for the AMP-Trust Pharmacy research prototype.

## Run locally

```bash
pip install -r requirements.txt
streamlit run app.py
```

## Streamlit Community Cloud

Select this repository, branch `main`, and set the main file path to `amp-trust-pharmacy/app.py`.

## Scope and limitations

The current app validates standard amino-acid sequences and calculates descriptive physicochemical properties with Biopython. It does not predict antimicrobial activity, toxicity, or therapeutic safety. These descriptors are not experimental evidence.

No raw research datasets, trained model weights, Kaggle outputs, credentials, or private records are included in this folder.
