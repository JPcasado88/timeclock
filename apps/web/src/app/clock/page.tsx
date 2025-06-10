'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

export default function ClockPage() {
  const [employeeId, setEmployeeId] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [clockedInEmployees] = useState(['EMP002']) // Mock data

  const handleManualClock = async (action: 'in' | 'out') => {
    if (!employeeId.trim()) {
      toast.error('Please enter an Employee ID')
      return
    }

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success(`Employee ${employeeId} clocked ${action} successfully!`)
      setEmployeeId('')
    } catch (error) {
      toast.error('Clock action failed')
    }
  }

  const handleQRScan = () => {
    setIsScanning(true)
    toast('QR Scanner started - point camera at QR code', { icon: 'ℹ️' })
    // Note: In a real implementation, this would start the camera and QR scanning library
    // For demo purposes, click the "Simulate Scan" button that will appear
  }

  const handleSimulateScan = (employeeId: string) => {
    const isClockingIn = !clockedInEmployees.includes(employeeId)
    toast.success(`QR Code scanned! Employee ${employeeId} clocked ${isClockingIn ? 'in' : 'out'}!`)
    setIsScanning(false)
  }

  const formatTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-2 inline-flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Employee Time Clock</h1>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-4xl font-mono font-bold text-blue-600">
              {formatTime()}
            </div>
          </div>
        </div>
        </div>

        {/* QR Scanner Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">QR Code Scanner</h2>
            <p className="text-gray-600">Scan your employee QR code to clock in/out</p>
          </div>
          <div className="p-6">
            <div className="text-center">
              {!isScanning ? (
                <div>
                  <div className="w-64 h-64 mx-auto bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h2M4 4h4m12 0h2M4 20h4m12 0h2" />
                      </svg>
                      <p className="text-gray-500">Camera preview will appear here</p>
                    </div>
                  </div>
                  <button
                    onClick={handleQRScan}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Start QR Scanner
                  </button>
                </div>
              ) : (
                <div>
                  <div className="w-64 h-64 mx-auto bg-blue-100 border-2 border-blue-300 rounded-lg flex items-center justify-center mb-4 relative">
                    <div className="text-center">
                      <div className="animate-pulse">
                        <div className="w-8 h-8 border-2 border-blue-600 absolute top-4 left-4"></div>
                        <div className="w-8 h-8 border-2 border-blue-600 absolute top-4 right-4"></div>
                        <div className="w-8 h-8 border-2 border-blue-600 absolute bottom-4 left-4"></div>
                        <div className="w-8 h-8 border-2 border-blue-600 absolute bottom-4 right-4"></div>
                      </div>
                      <svg className="w-16 h-16 text-blue-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h2M4 4h4m12 0h2M4 20h4m12 0h2" />
                      </svg>
                      <p className="text-blue-600 font-medium">Camera Active</p>
                      <p className="text-blue-500 text-xs">Point camera at QR code</p>
                    </div>
                  </div>
                  
                  {/* Demo Simulation Buttons */}
                  <div className="mb-4">
                    <p className="text-center text-sm text-gray-600 mb-3">Demo: Simulate scanning an employee QR code</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <button
                        onClick={() => handleSimulateScan('EMP001')}
                        className="bg-green-500 text-white px-3 py-1 text-sm rounded hover:bg-green-600 transition-colors"
                      >
                        Scan EMP001 (John)
                      </button>
                      <button
                        onClick={() => handleSimulateScan('EMP002')}
                        className="bg-green-500 text-white px-3 py-1 text-sm rounded hover:bg-green-600 transition-colors"
                      >
                        Scan EMP002 (Jane)
                      </button>
                      <button
                        onClick={() => handleSimulateScan('EMP003')}
                        className="bg-green-500 text-white px-3 py-1 text-sm rounded hover:bg-green-600 transition-colors"
                      >
                        Scan EMP003 (Mike)
                      </button>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setIsScanning(false)}
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Stop Scanner
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Manual Entry Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Manual Entry</h2>
            <p className="text-gray-600">Enter your Employee ID manually</p>
          </div>
          <div className="p-6">
            <div className="max-w-md mx-auto">
              <div className="mb-4">
                <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-2">
                  Employee ID
                </label>
                <input
                  type="text"
                  id="employeeId"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  placeholder="Enter your Employee ID (e.g., EMP001)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleManualClock('in')}
                  disabled={!employeeId.trim()}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Clock In
                </button>
                <button
                  onClick={() => handleManualClock('out')}
                  disabled={!employeeId.trim()}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Clock Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Status */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Currently Clocked In</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {clockedInEmployees.map((emp) => (
                <span
                  key={emp}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                >
                  {emp}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 