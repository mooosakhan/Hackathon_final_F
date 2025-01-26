"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useBeneficiaryContext } from "@/context/BeneficiaryContext";

export default function VisitorForm() {

    const router = useRouter();
    const { getBeneficiaryInfo } = useBeneficiaryContext()!;

    const [formData, setFormData] = useState({
        cnic: "",
        phone: "",
        name: "",
        address: "",
        purposeOfVisit: "",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSelectChange = (value: string) => {
        setFormData((prevData) => ({ ...prevData, purposeOfVisit: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const url = "http://localhost:4000/api/auth/register-beneficiary"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                CNIC: formData.cnic,
                Phone: formData.phone,
                Name: formData.name,
                Address: formData.address,
                PurposeOfVisit: formData.purposeOfVisit
            }),
        })

        if (response.ok) {
            const data = await response.json();
            getBeneficiaryInfo(data);
            router.push("/print");
        } else {
            console.error("Error:", response.statusText)
        }
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Visitor Information</CardTitle>
                <CardDescription>Please fill out the form below with your details.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="cnic">CNIC</Label>
                            <Input
                                id="cnic"
                                name="cnic"
                                value={formData.cnic}
                                onChange={handleInputChange}
                                placeholder="XXXXX-XXXXXXX-X"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="03XX-XXXXXXX"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Ali Hassnain"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Abc home"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="purposeOfVisit">Purpose of Visit</Label>
                        <Select name="purposeOfVisit" value={formData.purposeOfVisit} onValueChange={handleSelectChange} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select purpose of visit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="financial aid">Financial Aid</SelectItem>
                                <SelectItem value="medical assistance">Medical Assistance</SelectItem>
                                <SelectItem value="education support">Education Support</SelectItem>
                                <SelectItem value="food support">Food Support</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}