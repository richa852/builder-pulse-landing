import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Construction } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderProps {
  title: string;
  description: string;
  backTo?: string;
}

export default function Placeholder({ title, description, backTo = "/" }: PlaceholderProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron/5 to-turmeric/5 flex items-center justify-center">
      <Card className="w-full max-w-md mx-4 border-curry/20">
        <CardHeader className="text-center">
          <Construction className="w-16 h-16 text-curry/40 mx-auto mb-4" />
          <CardTitle className="text-curry">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            This page is coming soon. Continue exploring or ask me to build this section!
          </p>
          <Link to={backTo}>
            <Button variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
