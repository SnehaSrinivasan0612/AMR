import React from 'react'

function Help_Dashboard() {
  return (
    <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold">Welcome to Your Dashboard!</h2>
        <p>Welcome to the Dashboard, your personal command center for managing your electricity consumption and costs! It’s designed to give you a quick, clear, and comprehensive view of your energy usage, so you can stay informed, take control, and make smarter decisions to save on your electricity bill. Let’s walk through the key sections that make this experience simple and intuitive.</p>
        
        <h3 className="text-xl font-semibold">📊 Energy Bill Graph – Track Your Spending at a Glance!</h3>
        <p>Have you ever wondered how your electricity bill changes over time? The Energy Bill Graph makes it easy to track your spending with a month-by-month breakdown. It’s like your financial health monitor for electricity usage!</p>
        <ul>
          <li>See trends over time: Whether you're curious about seasonal fluctuations or sudden spikes, this graph helps you keep an eye on your energy expenses.</li>
          <li>Spot irregularities: If you notice a sudden increase in your bill, this graph gives you a clear visual cue. You can dig deeper into the details to identify whether an appliance or usage pattern is causing the rise.</li>
        </ul>
        <p>By regularly checking this graph, you can stay proactive and avoid any surprises when your bill arrives.</p>
        
        <h3 className="text-xl font-semibold">🍩 Cost Breakdown – Where Does Your Money Go?</h3>
        <p>Understanding your bill doesn’t have to be a mystery anymore! The Cost Breakdown Donut Chart clearly shows you how your total bill is divided into different charges, so you’ll always know exactly what you’re paying for.</p>
        <ul>
          <li>Duty – This is a government-imposed charge based on your electricity usage.</li>
          <li>Fuel Surcharge – An additional charge that fluctuates with changes in fuel prices, impacting the cost of electricity production.</li>
          <li>Fixed Charge – A standard fee based on your connection type, which is added to your bill regardless of your usage.</li>
          <li>Meter Rent – This covers the maintenance or rental cost of your electricity meter.</li>
          <li>Monthly Fuel Surcharge – This fluctuates monthly, depending on fuel costs, and is added to your bill.</li>
        </ul>
        <p>This visual representation is simple but powerful! By hovering over each section, you can see the exact amounts for each charge, allowing you to understand how your bill is calculated. This transparency will help you make more informed decisions when it comes to energy consumption.</p>
        
        <h3 className="text-xl font-semibold">⚡ Cost Per Unit – Know What You’re Paying for Each kWh!</h3>
        <p>Ever wondered exactly how much you’re paying for each unit of electricity? The Cost Per Unit section shows you the real-time rate for electricity, which can fluctuate based on various factors.</p>
        <ul>
          <li>Stay informed: Knowing the exact cost per kilowatt-hour (kWh) helps you plan your energy usage more effectively.</li>
          <li>Optimize consumption: If the cost per unit rises, you can adjust your habits (e.g., switching to energy-saving modes or using appliances at off-peak times) to lower your overall cost.</li>
        </ul>
        
        <h3 className="text-xl font-semibold">💡 How to Use Your Dashboard Like a Pro!</h3>
        <ol>
          <li>Open the Dashboard: It’s the first thing you’ll see when you log in—your personalized energy control center.</li>
          <li>Track Energy Trends: Check your Energy Bill Graph to get an overview of your electricity costs and notice any patterns over time.</li>
          <li>Analyze Your Bill Breakdown: Dive into the Donut Chart to understand exactly where your money is going each month.</li>
          <li>Monitor the Cost Per Unit: Keep a close eye on the Cost Per Unit section to stay informed about your real-time charges.</li>
        </ol>
        <p>By using these insights, you’ll be able to make smarter energy choices, save money, and ultimately take control of your electricity expenses. It’s all about using your energy your way, saving money, and feeling empowered about your consumption habits. 🚀</p>
    </div>
  )
}

export default Help_Dashboard
  