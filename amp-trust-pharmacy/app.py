import re

import streamlit as st
from Bio.SeqUtils.ProtParam import ProteinAnalysis

STANDARD_AA = set("ACDEFGHIKLMNPQRSTVWY")
MAX_LENGTH = 500


def normalize_sequence(raw: str) -> str:
    """Normalize pasted FASTA-like sequence text to a compact uppercase sequence."""
    lines = [
        line.strip()
        for line in raw.splitlines()
        if line.strip() and not line.lstrip().startswith(">")
    ]
    return re.sub(r"\s+", "", "".join(lines)).upper()


def validate_sequence(sequence: str) -> tuple[bool, str]:
    if not sequence:
        return False, "أدخل تسلسل ببتيد أولاً."
    if len(sequence) < 2:
        return False, "يجب أن يتكون التسلسل من حمضين أمينيين على الأقل."
    if len(sequence) > MAX_LENGTH:
        return False, f"الحد الأقصى المسموح به هو {MAX_LENGTH} حمضاً أمينياً."
    invalid = sorted(set(sequence) - STANDARD_AA)
    if invalid:
        return False, "رموز غير مدعومة: " + ", ".join(invalid)
    return True, ""


def calculate_descriptors(sequence: str) -> dict[str, float]:
    analysis = ProteinAnalysis(sequence)
    return {
        "Molecular weight (Da)": analysis.molecular_weight(),
        "Theoretical pI": analysis.isoelectric_point(),
        "Aromaticity": analysis.aromaticity(),
        "Instability index": analysis.instability_index(),
        "GRAVY": analysis.gravy(),
    }


st.set_page_config(
    page_title="AMP-Trust Pharmacy",
    page_icon="🧬",
    layout="centered",
)

st.title("🧬 AMP-Trust Pharmacy")
st.subheader("Antimicrobial Peptide Sequence Explorer")
st.write(
    "أدخل تسلسل ببتيد باستخدام رموز الأحماض الأمينية القياسية "
    "لعرض فحوصات الجودة والخصائص الفيزيائية والكيميائية الأساسية."
)

st.info(
    "هذه نسخة أولية لفحص التسلسل وحساب الخصائص فقط. "
    "لا يتوفر في المستودع حالياً نموذج تنبؤ موثّق؛ لذلك لا يصدر التطبيق "
    "حكماً بالنشاط المضاد للميكروبات أو السلامة."
)

raw_sequence = st.text_area(
    "Peptide sequence",
    placeholder="KWKLFKKIGAVLKVL",
    height=120,
    help="يمكن لصق تسلسل خام أو FASTA؛ سيتم تجاهل سطر العنوان الذي يبدأ بعلامة >.",
)

if st.button("Analyze sequence", type="primary"):
    st.session_state.pop("amp_sequence", None)
    st.session_state.pop("amp_descriptors", None)
    st.session_state.pop("amp_ai_explanation", None)
    st.session_state.pop("amp_ai_error", None)

    sequence = normalize_sequence(raw_sequence)
    valid, message = validate_sequence(sequence)

    if not valid:
        st.error(message)
    else:
        st.session_state["amp_sequence"] = sequence
        st.session_state["amp_descriptors"] = calculate_descriptors(sequence)
        st.success("اجتاز التسلسل فحص الرموز والطول.")

if st.session_state.get("amp_descriptors"):
    sequence = st.session_state["amp_sequence"]
    descriptors = st.session_state["amp_descriptors"]

    st.code(sequence, language=None)
    st.caption(f"Sequence length: {len(sequence)} amino acids")

    col1, col2 = st.columns(2)
    col1.metric("Molecular weight", f"{descriptors['Molecular weight (Da)']:.2f} Da")
    col2.metric("Theoretical pI", f"{descriptors['Theoretical pI']:.2f}")

    col3, col4, col5 = st.columns(3)
    col3.metric("Aromaticity", f"{descriptors['Aromaticity']:.3f}")
    col4.metric("Instability index", f"{descriptors['Instability index']:.2f}")
    col5.metric("GRAVY", f"{descriptors['GRAVY']:.3f}")

    st.warning(
        "هذه مؤشرات حاسوبية وصفية وليست دليلاً على الفعالية أو السمية "
        "أو السلامة أو الصلاحية العلاجية. يلزم تقييم تجريبي مستقل."
    )

    st.caption(
        "اختياري: عند الضغط على الزر أدناه، تُرسل الواصفات المحسوبة فقط إلى Cent AI؛ "
        "ولا يُرسل تسلسل الببتيد. قد يترتب على الطلب استهلاك رصيد لدى المزود."
    )
    if st.button("اطلب تفسيراً وصفياً من Cent AI"):
        from cent_ai import explain_descriptors

        with st.spinner("جارٍ طلب التفسير الوصفي..."):
            try:
                st.session_state["amp_ai_explanation"] = explain_descriptors(descriptors)
                st.session_state.pop("amp_ai_error", None)
            except RuntimeError as exc:
                st.session_state["amp_ai_error"] = str(exc)
            except Exception as exc:
                st.session_state["amp_ai_error"] = (
                    "تعذر الاتصال بخدمة Cent AI. "
                    f"نوع الخطأ: {type(exc).__name__}. راجع إعدادات Secrets وسجل الخدمة."
                )

    if st.session_state.get("amp_ai_error"):
        st.error(st.session_state["amp_ai_error"])
    if st.session_state.get("amp_ai_explanation"):
        st.subheader("التفسير الوصفي المساعد")
        st.write(st.session_state["amp_ai_explanation"])
        st.caption(
            "مخرجات مولّدة بالذكاء الاصطناعي لأغراض الوصف فقط؛ ليست تنبؤاً بالنشاط "
            "المضاد للميكروبات أو السمية أو السلامة أو الفعالية العلاجية."
        )

st.divider()
st.caption(
    "AMP-Trust Pharmacy · Research prototype · "
    "Biopython ProtParam descriptors"
)
