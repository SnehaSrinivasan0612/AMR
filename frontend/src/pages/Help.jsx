import React from 'react'
import Navbar from '../components/Navbar.jsx'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import '../assets/help.css'
export default function Help() {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex' }}>
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <h1>Help</h1>
                <section className="help-section">
                    <div className="getting-started">
                      <h2>Getting Started</h2>
                      <p>
                        This user manual provides step-by-step instructions for using the electricity
                        monitoring and bill calculation system. It covers all features, from monitoring
                        real-time data to analyzing trends, managing bills, and personalizing your profile.
                      </p>
                      <p>
                        This guide is intended for homeowners, businesses, or organizations seeking to
                        monitor and optimize their energy consumption.
                      </p>
                      <a href="#" className="download-button">Download User Manual</a>
                    </div>

                    <div className="important-links">
                      <h2>Other Important Links</h2>
                      <ul>
                        <li>
                          <a href="#" className="link">
                            <h3>Using the Dashboard</h3>
                          </a>
                          <p>The Dashboard provides a snapshot of your energy consumption.</p>
                        </li>
                        <li>
                          <a href="#" className="link">
                            <h3>Understanding Analytics</h3>
                          </a>
                          <p>The Analytics page provides detailed insights into your energy consumption patterns.</p>
                        </li>
                        <li>
                          <a href="#" className="link">
                            <h3>Managing Bills</h3>
                          </a>
                          <p>The Bills page displays your current bill and past billing history.</p>
                        </li>
                        <li>
                          <a href="#" className="link">
                            <h3>Troubleshooting</h3>
                          </a>
                          <p>
                            Encountering an issue? This section provides quick fixes and solutions to common
                            problems you might face while using the system, ensuring a smooth experience.
                          </p>
                        </li>
                        <li>
                          <a href="#" className="link">
                            <h3>Frequently Asked Questions (FAQs)</h3>
                          </a>
                          <p>
                            Got questions? Here are answers to some of the most frequently asked questions to
                            help you better understand and navigate the platform.
                          </p>
                        </li>
                        <li>
                          <a href="#" className="link">
                            <h3>Tips for Energy Efficiency</h3>
                          </a>
                          <p>
                            Looking to save energy and reduce your electricity bills? Follow these practical
                            tips to optimize your energy consumption effectively.
                          </p>
                        </li>
                      </ul>
                    </div>
                </section>
            </Box>
        </Box>
  )
}
