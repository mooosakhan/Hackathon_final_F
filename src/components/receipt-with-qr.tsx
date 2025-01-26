"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { useBeneficiaryContext } from "@/context/BeneficiaryContext"

export function ReceiptWithQR() {

    const { beneficiaryInfo } = useBeneficiaryContext()!;

    const handlePrint = () => {
        window.print()
    }

    return (
        <>
            {
                beneficiaryInfo && (
                    <Card className="w-full max-w-md print:shadow-none">
                        <CardHeader className="border-b">
                            <CardTitle className="text-center">Visitor Receipt</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-medium">Name</TableCell>
                                            <TableCell>{beneficiaryInfo.Beneficiary.Name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">CNIC</TableCell>
                                            <TableCell>{beneficiaryInfo.Beneficiary.CNIC}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Phone</TableCell>
                                            <TableCell>{beneficiaryInfo.Beneficiary.Phone}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Address</TableCell>
                                            <TableCell>{beneficiaryInfo.Beneficiary.Address}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Purpose Of visit</TableCell>
                                            <TableCell>{beneficiaryInfo.Beneficiary.PurposeOfVisit}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <div className="flex justify-center">
                                    <img src={beneficiaryInfo.qrCode} alt="QR Code" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-center print:hidden">
                            <Button onClick={handlePrint}>Print Receipt</Button>
                        </CardFooter>
                    </Card>
                )
            }
        </>
    )
}

