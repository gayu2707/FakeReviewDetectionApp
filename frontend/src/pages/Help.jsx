import { motion } from "framer-motion";

function Help() {
  return (
    <motion.div
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="page-title">Help</h1>

      <div className="info-card">
        <h2>How to Use the Application</h2>
        <ul className="info-list">
          <li>Select a method from the Dashboard.</li>
          <li>Enter or paste the review text in the input box.</li>
          <li>Click <strong>Analyze</strong> to get a result.</li>
          <li>Use <strong>Compare</strong> to compare all three models together.</li>
          <li>View previous analyses in the <strong>History</strong> page.</li>
          <li>Check <strong>Reports</strong> for summary statistics and CSV download.</li>
        </ul>
      </div>

      <div className="info-card">
        <h2>Tips</h2>
        <ul className="info-list">
          <li>Use complete review sentences for better analysis.</li>
          <li>Avoid empty inputs.</li>
          <li>Try both suspicious and normal reviews to compare outputs.</li>
        </ul>
      </div>
    </motion.div>
  );
}

export default Help;