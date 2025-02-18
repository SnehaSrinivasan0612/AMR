import React from 'react'

function Help_faqs() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Got questions? We’ve got answers!</h2>
      <p>The FAQ section covers all the common queries and concerns to help you make the most out of your energy management system. If you don’t find the answer you’re looking for, don’t hesitate to reach out to us directly.</p>
      
      <h3 className="text-xl font-semibold">❓ General Questions</h3>
      <ul>
        <li><strong>Q: How do I create an account?</strong><br/>A: Click on the “Sign Up” button on the homepage and follow the on-screen instructions, including verifying your email.</li>
        <li><strong>Q: How can I reset my password?</strong><br/>A: Click “Forgot Password” on the login page, enter your email, and follow the instructions in the email.</li>
        <li><strong>Q: Can I change my billing cycle?</strong><br/>A: Currently, billing is monthly. Contact Customer Support for special arrangements.</li>
        <li><strong>Q: How do I update my account details?</strong><br/>A: Go to Profile Settings, edit the fields, and click “Save.”</li>
      </ul>
      
      <h3 className="text-xl font-semibold">💡 Payment and Billing Questions</h3>
      <ul>
        <li><strong>Q: How do I make a payment?</strong><br/>A: Click “Pay Now” on your dashboard and follow the secure payment steps.</li>
        <li><strong>Q: What payment methods are accepted?</strong><br/>A: Credit/Debit cards, Bank Transfers, Digital Wallets (PayPal, Google Pay, Apple Pay).</li>
        <li><strong>Q: What should I do if my payment is not processing?</strong><br/>A: Check payment details, ensure funds are available, try another method, or contact your bank.</li>
        <li><strong>Q: When will my payment be processed?</strong><br/>A: Payments are typically processed immediately but may take up to 24 hours.</li>
      </ul>
      
      <h3 className="text-xl font-semibold">🔧 Technical Questions</h3>
      <ul>
        <li><strong>Q: Why can’t I see my energy graph?</strong><br/>A: Check your internet connection, clear browser cache, or try a different browser.</li>
        <li><strong>Q: My app is crashing. What should I do?</strong><br/>A: Update the app, restart it, or reinstall it. Ensure your OS is up to date.</li>
      </ul>
      
      <h3 className="text-xl font-semibold">📌 Account and Profile Questions</h3>
      <ul>
        <li><strong>Q: How do I update my contact information?</strong><br/>A: Go to Profile Settings, edit your details, and click “Save.”</li>
        <li><strong>Q: Can I close my account?</strong><br/>A: Contact Customer Support to close your account and cancel services.</li>
      </ul>
      
      <p>We hope this section has answered your questions! If you still need assistance, our support team is available 24/7 via email, phone, or live chat.</p>
    </div>
  )
}

export default Help_faqs