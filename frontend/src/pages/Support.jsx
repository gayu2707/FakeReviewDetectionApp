import { useState } from "react";
import { motion } from "framer-motion";

function Support() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    issue: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "Why is a review marked as fake?",
      answer:
        "A review may be marked as fake if it contains exaggerated claims, generic praise, star references, or lacks product-specific details.",
    },
    {
      question: "What does confidence mean?",
      answer:
        "Confidence indicates how strongly the system believes the prediction. Higher confidence means a stronger signal.",
    },
    {
      question: "Why do VADER, SHAP, and HYBRID give different results?",
      answer:
        "Each model uses different detection logic. HYBRID combines signals from multiple approaches, so results may vary.",
    },
    {
      question: "Why is history not updating?",
      answer:
        "History depends on the backend and database connection. Make sure your backend is running and storing results correctly.",
    },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", issue: "" });
  };

  return (
    <motion.div className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="page-title">Support</h1>

      <div className="support-grid">
        <div className="info-card">
          <h2>Contact Support</h2>
          <p>Submit your issue and our support team will get back to you.</p>

          {submitted && (
            <p className="success-message">Your issue has been submitted successfully.</p>
          )}

          <form className="support-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="support-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="support-input"
            />
            <textarea
              name="issue"
              placeholder="Describe your issue..."
              value={form.issue}
              onChange={handleChange}
              required
              className="support-textarea"
            />
            <button type="submit" className="primary-btn">
              Submit
            </button>
          </form>
        </div>

        <div className="info-card">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div className="faq-item" key={index}>
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  {faq.question}
                </button>
                {openFaq === index && <p className="faq-answer">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Support;