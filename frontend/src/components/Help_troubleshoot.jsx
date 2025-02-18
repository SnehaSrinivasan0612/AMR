import React from 'react'

function Help_troubleshoot() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Troubleshooting</h2>
      <p>We know how frustrating technical issues can be, but don’t worry—we’ve got your back! If you're encountering problems with the system, the Troubleshooting section is designed to help you solve issues fast and get back to managing your energy efficiently.</p>
      
      <h3 className="text-xl font-semibold">🔧 Common Issues and Solutions</h3>
      <ul>
        <li><strong>Issue: Unable to Log In</strong><br/>Solution:
          <ul>
            <li>Ensure you are entering the correct username and password.</li>
            <li>Click on the “Forgot Password” link if needed.</li>
            <li>Check your internet connection.</li>
            <li>Wait a few minutes or contact support if your account is locked.</li>
          </ul>
        </li>
        <li><strong>Issue: Energy Bill Graph Not Showing Correct Data</strong><br/>Solution:
          <ul>
            <li>Refresh the page.</li>
            <li>Ensure you have a stable internet connection.</li>
            <li>Try logging out and logging back in.</li>
            <li>Clear your browser’s cache or use a different browser.</li>
          </ul>
        </li>
        <li><strong>Issue: Payment Not Processing</strong><br/>Solution:
          <ul>
            <li>Double-check payment details.</li>
            <li>Ensure your payment method has sufficient funds.</li>
            <li>Try using a different payment method.</li>
            <li>Disable browser extensions that may interfere with payments.</li>
          </ul>
        </li>
        <li><strong>Issue: Slow Loading or Unresponsive App/Website</strong><br/>Solution:
          <ul>
            <li>Check your internet connection.</li>
            <li>Clear your browser’s cache and cookies.</li>
            <li>Try a different device or browser.</li>
            <li>Ensure your browser or app is updated.</li>
          </ul>
        </li>
      </ul>
      
      <h3 className="text-xl font-semibold">💡 Helpful Tips for Troubleshooting</h3>
      <ul>
        <li>Check Your Internet Connection.</li>
        <li>Clear Your Cache.</li>
        <li>Log Out and Log In Again.</li>
      </ul>
      
      <h3 className="text-xl font-semibold">🔍 Still Having Trouble?</h3>
      <p>If you’ve tried the above solutions and still encounter problems, don’t hesitate to reach out to our Customer Support team. We’re here to help!</p>
      <ul>
        <li><strong>Email:</strong> support@yourcompany.com</li>
        <li><strong>Phone:</strong> +123-456-7890</li>
        <li><strong>Live Chat:</strong> Available on our website, 24/7.</li>
      </ul>
      <p>Our team is ready to assist with any issue you may be experiencing. We’ll guide you through every step to get things running smoothly again!</p>
    </div>
  )
}

export default Help_troubleshoot