export default function AdminPage() {
  return (
    <main className="admin-gate" dir="rtl">
      <div className="admin-gate-card">
        <div className="brand-mark">KH</div>
        <p className="eyebrow">KNOWLEDGE HUB · ADMIN</p>
        <h1>منطقة الإدارة</h1>
        <p>هذه مساحة الإدارة المنفصلة. لم يتم تفعيل المصادقة بعد؛ لذلك لا توجد وظائف إدارية أو بيانات محمية متاحة في هذا النموذج الأولي.</p>
        <div className="notice">يلزم إعداد مزود هوية، والتحقق من الجلسة على الخادم، وتطبيق صلاحيات الوصول وRLS قبل فتح هذه المنطقة.</div>
        <a className="back-link" href="/">العودة إلى مساحة العمل ←</a>
      </div>
    </main>
  );
}
