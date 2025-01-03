import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Palmtree, Home, Heart } from "lucide-react";

const PaymentOptions = ({ amount, onClose }) => (
    <div className="space-y-4 p-4">
        <h3 className="text-lg font-medium">Choose Payment Method</h3>
        <div className="grid grid-cols-2 gap-4">
            {[
                { name: "Venmo", icon: "V" },
                { name: "Zelle", icon: "Z" },
                { name: "PayPal", icon: "P" },
                { name: "Check", icon: "C" },
            ].map((method) => (
                <Button
                    key={method.name}
                    variant="outline"
                    className="h-16 flex items-center justify-center gap-2"
                    onClick={() => onClose()}
                >
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                        {method.icon}
                    </div>
                    {method.name}
                </Button>
            ))}
        </div>
    </div>
);

const GiftOption = ({ title, icon, amounts }) => {
    const [showPayment, setShowPayment] = useState(false);
    const [showCustom, setShowCustom] = useState(false);
    const [customAmount, setCustomAmount] = useState("");
    const Icon = icon;

    const handleCustomAmount = (value) => {
        const amount = parseInt(value);
        if (amount > 500) setCustomAmount("500");
        else if (amount < 25) setCustomAmount("25");
        else setCustomAmount(value);
    };

    return (
        <Card className="h-full">
            <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                    <Icon className="w-6 h-6 text-blue-500" />
                    <h3 className="text-lg font-medium">{title}</h3>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {amounts.map((amount) => (
                        <Button
                            key={amount}
                            variant="outline"
                            onClick={() => setShowPayment(true)}
                        >
                            ${amount}
                        </Button>
                    ))}
                </div>
                <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => setShowCustom(!showCustom)}
                >
                    {showCustom ? "Hide Custom" : "Custom Amount"}
                </Button>
                {showCustom && (
                    <div className="flex gap-2">
                        <Input
                            type="number"
                            min="25"
                            max="500"
                            placeholder="Custom amount"
                            value={customAmount}
                            onChange={(e) => handleCustomAmount(e.target.value)}
                        />
                        <Button onClick={() => setShowPayment(true)}>Give</Button>
                    </div>
                )}
            </CardContent>
            {showPayment && (
                <CardFooter>
                    <PaymentOptions
                        amount={customAmount || amounts[0]}
                        onClose={() => setShowPayment(false)}
                    />
                </CardFooter>
            )}
        </Card>
    );
};

const WeddingRegistry = () => {
    const options = [
        {
            title: "Send us on a Date",
            icon: Heart,
            amounts: [25, 50, 100]
        },
        {
            title: "Help with our Honeymoon",
            icon: Palmtree,
            amounts: [25, 50, 100]
        },
        {
            title: "Help towards a Home",
            icon: Home,
            amounts: [25, 50, 100]
        }
    ];

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Our Wedding Registry</h1>
            <div className="grid grid-cols-3 gap-4">
                {options.map((option) => (
                    <GiftOption key={option.title} {...option} />
                ))}
            </div>
        </div>
    );
};

export default WeddingRegistry;