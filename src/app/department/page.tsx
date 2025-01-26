"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff } from "lucide-react"
import Cookies from "js-cookie"

export default function Department() {
    const [username, setUsername] = useState<string | null>(null)
    const [beneficiary, setBeneficiary] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [showSensitiveInfo, setShowSensitiveInfo] = useState(false)

    const router = useRouter()
    const id = new URLSearchParams(window.location.search).get("")

    useEffect(() => {
        // Fetch username from cookies
        const storedUsername = Cookies.get("username")
        setUsername(storedUsername ?? null)

        if (id) {
            // Fetch data from the API
            const fetchData = async () => {
                try {
                    const response = await fetch(`/api/department/${id}`)
                    if (!response.ok) throw new Error("Failed to fetch beneficiary data")
                    const data = await response.json()
                    setBeneficiary(data)
                } catch (err: any) {
                    setError(err.message)
                } finally {
                    setLoading(false)
                }
            }
            fetchData()
        }
    }, [id])

    const toggleSensitiveInfo = () => {
        setShowSensitiveInfo(!showSensitiveInfo)
    }

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "pending":
                return "bg-yellow-200 text-yellow-800"
            case "approved":
                return "bg-green-200 text-green-800"
            case "rejected":
                return "bg-red-200 text-red-800"
            default:
                return "bg-gray-200 text-gray-800"
        }
    }

    if (loading) {
        return <div className="container mx-auto p-4">Loading...</div>
    }

    if (error) {
        return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>
    }

    if (!beneficiary) {
        return <div className="container mx-auto p-4">No beneficiary data found.</div>
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">👋 Welcome, {username || "User"}!</h1>
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        Beneficiary Info
                        <Button variant="outline" size="sm" onClick={toggleSensitiveInfo}>
                            {showSensitiveInfo ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            {showSensitiveInfo ? "Hide" : "Show"} Sensitive Info
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableBody>
                            {Object.entries(beneficiary).map(([key, value]) => (
                                <TableRow key={key} className="hover:bg-gray-100 transition-colors duration-200">
                                    <TableCell className="font-medium capitalize">{key}</TableCell>
                                    <TableCell>
                                        {key === "status" ? (
                                            <Badge className={getStatusColor(value as string)}>{value as string}</Badge>
                                        ) : key === "cnic" || key === "phone" ? (
                                            showSensitiveInfo ? (
                                                value
                                            ) : (
                                                "••••••••••••"
                                            )
                                        ) : (
                                            value
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Button className="w-full">Update Beneficiary Info</Button>
        </div>
    )
}
