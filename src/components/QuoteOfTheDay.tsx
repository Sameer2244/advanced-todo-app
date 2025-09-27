import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function QuoteOfTheDay() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Quote of the day
          </h4>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between">
        <blockquote className="border-l-2 pl-6 italic">
          &quot;After all,&quot; he said, &quot;everyone enjoys a good joke, so
          it&apos;s only fair that they should pay for the privilege.&quot;
        </blockquote>
      </CardContent>
    </Card>
  );
}
