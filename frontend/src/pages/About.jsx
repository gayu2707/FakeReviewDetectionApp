function About() {
  return (
    <div className="page">
      <h1 className="page-title">About</h1>
      <div className="info-card">
        <h2>About ReviewAI</h2>
        <p>
          ReviewAI is a fake review detection platform that analyzes user reviews
          using VADER, SHAP, and HYBRID methods to identify suspicious, fake,
          or genuine reviews.
        </p>
        <p>
          The system helps users and businesses evaluate the reliability of
          online feedback using intelligent text analysis techniques.
        </p>
      </div>
    </div>
  );
}

export default About;