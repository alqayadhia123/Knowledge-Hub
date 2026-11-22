"""Optional, opt-in descriptive interpretation through Cent AI."""

import os

BASE_URL = "https://api.cent-ai.dev/v1"

SYSTEM_PROMPT = (
    "You are a cautious scientific writing assistant for an antimicrobial peptide "
    "research prototype. Interpret only the supplied physicochemical descriptors. "
    "Do not infer or claim antimicrobial activity, toxicity, safety, efficacy, "
    "therapeutic suitability, or clinical outcomes. Explain that descriptors are "
    "computational observations and require independent experimental validation. "
    "If evidence is insufficient, say so clearly. Respond in Arabic."
)


def _read_setting(name: str) -> str | None:
    """Prefer Streamlit Cloud Secrets; use environment variables as a fallback."""
    try:
        import streamlit as st

        value = st.secrets.get(name)
        if value:
            return str(value).strip()
    except Exception:
        pass

    value = os.getenv(name)
    return value.strip() if value else None


def explain_descriptors(descriptors: dict[str, float]) -> str:
    """Return a cautious interpretation of descriptors; no sequence is transmitted."""
    api_key = _read_setting("CENT_AI_API_KEY")
    if not api_key:
        raise RuntimeError("إعداد CENT_AI_API_KEY غير موجود في Secrets.")

    model = _read_setting("CENT_AI_MODEL")
    if not model:
        raise RuntimeError("إعداد CENT_AI_MODEL غير موجود في Secrets.")

    from openai import OpenAI

    client = OpenAI(
        base_url=BASE_URL,
        api_key=api_key,
        timeout=30,
        max_retries=0,
    )
    descriptor_text = "\\n".join(
        f"{name}: {value}" for name, value in descriptors.items()
    )
    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {
                "role": "user",
                "content": (
                    "قدّم تفسيراً وصفياً موجزاً لهذه الواصفات فقط، واذكر حدودها العلمية:\\n"
                    f"{descriptor_text}"
                ),
            },
        ],
        temperature=0.2,
        max_tokens=350,
    )
    content = response.choices[0].message.content
    if not content or not content.strip():
        raise RuntimeError("أعاد النموذج استجابة فارغة.")
    return content.strip()
