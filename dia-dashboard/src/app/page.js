"use client";

import { useState } from "react";

export default function Dashboard() {
    const [stats] = useState({
        totalDocuments: 1247,
        totalAnalyses: 3421,
        activeUsers: 89,
        avgProcessingTime: "2.3s"
    });

    const [recentAnalyses] = useState([
        {
            id: 1,
            documentName: "Government Policy Document.pdf",
            task: "Summarize",
            language: "English",
            timestamp: "2 minutes ago",
            status: "completed"
        },
        {
            id: 2,
            documentName: "Budget Report 2024.docx",
            task: "Extract",
            language: "Bilingual",
            timestamp: "15 minutes ago",
            status: "completed"
        },
        {
            id: 3,
            documentName: "Legal Framework.txt",
            task: "Compare",
            language: "Odia",
            timestamp: "1 hour ago",
            status: "completed"
        },
        {
            id: 4,
            documentName: "Annual Report.pdf",
            task: "Q&A",
            language: "English",
            timestamp: "2 hours ago",
            status: "completed"
        },
        {
            id: 5,
            documentName: "Regulation Document.pdf",
            task: "Summarize",
            language: "Bilingual",
            timestamp: "3 hours ago",
            status: "completed"
        }
    ]);

    const [taskBreakdown] = useState([
        { task: "Summarize", count: 1247, percentage: 36 },
        { task: "Extract", count: 1023, percentage: 30 },
        { task: "Compare", count: 687, percentage: 20 },
        { task: "Q&A", count: 464, percentage: 14 }
    ]);

    const [languageUsage] = useState([
        { language: "English", count: 1856, percentage: 54 },
        { language: "Odia", count: 1023, percentage: 30 },
        { language: "Bilingual", count: 542, percentage: 16 }
    ]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Document Intelligence Agent
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Dashboard & Analytics
                            </p>
                        </div>
                        <a
                            href="https://dia.ooumph.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Open DIA Tool
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Documents</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalDocuments.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Analyses</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalAnalyses.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Active Users</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeUsers}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Avg Processing Time</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.avgProcessingTime}</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Task Breakdown */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Task Breakdown</h2>
                        <div className="space-y-4">
                            {taskBreakdown.map((item, index) => (
                                <div key={index}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg">
                                                {item.task === "Summarize" && "📋"}
                                                {item.task === "Extract" && "🔍"}
                                                {item.task === "Compare" && "⚖️"}
                                                {item.task === "Q&A" && "💬"}
                                            </span>
                                            <span className="font-semibold text-gray-700">{item.task}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm text-gray-600">{item.count.toLocaleString()}</span>
                                            <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className={`h-3 rounded-full transition-all duration-500 ${
                                                index === 0 ? "bg-blue-500" :
                                                index === 1 ? "bg-green-500" :
                                                index === 2 ? "bg-purple-500" : "bg-orange-500"
                                            }`}
                                            style={{ width: `${item.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Language Usage */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Language Usage</h2>
                        <div className="space-y-6">
                            {languageUsage.map((item, index) => (
                                <div key={index}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold text-gray-700">{item.language}</span>
                                        <span className="text-sm text-gray-600">{item.count.toLocaleString()}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-500 ${
                                                index === 0 ? "bg-indigo-500" :
                                                index === 1 ? "bg-teal-500" : "bg-cyan-500"
                                            }`}
                                            style={{ width: `${item.percentage}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">{item.percentage}% of total</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Analyses */}
                <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Recent Analyses</h2>
                        <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                            View All
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Document</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Task</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Language</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Time</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentAnalyses.map((analysis) => (
                                    <tr key={analysis.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                <span className="font-medium text-gray-900">{analysis.documentName}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                                {analysis.task === "Summarize" && "📋"}
                                                {analysis.task === "Extract" && "🔍"}
                                                {analysis.task === "Compare" && "⚖️"}
                                                {analysis.task === "Q&A" && "💬"}
                                                {analysis.task}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-sm text-gray-700">{analysis.language}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-sm text-gray-600">{analysis.timestamp}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                {analysis.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                        <h3 className="text-lg font-bold mb-2">📋 Summarize</h3>
                        <p className="text-sm opacity-90 mb-4">Quick document summaries</p>
                        <a
                            href="https://dia.ooumph.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-sm font-medium bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                            Start Analysis →
                        </a>
                    </div>

                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                        <h3 className="text-lg font-bold mb-2">🔍 Extract</h3>
                        <p className="text-sm opacity-90 mb-4">Extract key information</p>
                        <a
                            href="https://dia.ooumph.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-sm font-medium bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
                        >
                            Start Analysis →
                        </a>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                        <h3 className="text-lg font-bold mb-2">⚖️ Compare</h3>
                        <p className="text-sm opacity-90 mb-4">Compare multiple documents</p>
                        <a
                            href="https://dia.ooumph.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-sm font-medium bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                            Start Analysis →
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
