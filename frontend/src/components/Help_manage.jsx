import React from 'react'

function Help_manage() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Bills</h2>
      <p>Keeping track of your electricity bills has never been easier! The Bills section provides you with a clear and organized overview of all your current unpaid bills, ensuring you never miss a payment and can stay on top of your finances without stress.</p>
      
      <h3 className="text-xl font-semibold">What You’ll Find Here:</h3>
      <ul>
        <li><strong>List of Unpaid Bills</strong> – At a glance, you’ll see all your pending bills in one convenient place. Each bill is neatly listed with key details such as the due date, total amount, and the status of the payment.</li>
        <li><strong>Bill Breakup on Click</strong> – Want to dive deeper into how your charges are calculated? Simply click on any bill to see a detailed breakdown of the total amount.</li>
      </ul>
      
      <h3 className="text-xl font-semibold">Bill Breakdown Includes:</h3>
      <ul>
        <li><strong>Energy Charges</strong> – The cost of the electricity you’ve used during the billing period.</li>
        <li><strong>Duty & Taxes</strong> – Government-imposed charges and taxes applied to your bill.</li>
        <li><strong>Fuel Surcharge</strong> – Any additional charges based on fuel price fluctuations that impact electricity generation.</li>
        <li><strong>Fixed Charges & Meter Rent</strong> – These charges remain the same every month, covering the fixed cost of your meter and other essential services.</li>
        <li><strong>Monthly Fuel Surcharge</strong> – If applicable, this surcharge adjusts depending on fuel price fluctuations.</li>
      </ul>
      
      <h3 className="text-xl font-semibold">💡 Quick and Convenient Payments!</h3>
      <p>Each bill comes with a "Pay Now" button, giving you a quick and hassle-free way to settle your outstanding balance. Clicking this button will redirect you to a secure payment page, where you can make your payment with your preferred payment method.</p>
      
      <ul>
        <li><strong>✅ No More Late Fees</strong> – Never worry about missing a payment again! Get timely reminders for upcoming due dates.</li>
        <li><strong>✅ Complete Transparency</strong> – With the detailed breakdown of each bill, you can clearly see what you’re paying for and why.</li>
        <li><strong>✅ Seamless Experience</strong> – Whether you’re viewing your bills, understanding the charges, or making a payment, everything is designed to work effortlessly for you.</li>
      </ul>
      
      <h3 className="text-xl font-semibold">📌 Need to Revisit an Old Bill?</h3>
      <p>Don’t worry about losing track of your past payments! Simply visit the History section where you can find a detailed record of all your previous bills and payments.</p>
      
      <p>With the Bills section, you can confidently manage your electricity expenses and avoid the stress of unpaid bills. The clear, concise, and user-friendly design ensures that managing your payments is easier than ever, helping you stay organized and financially on track. 💡💰</p>
    </div>
  )
}

export default Help_manage