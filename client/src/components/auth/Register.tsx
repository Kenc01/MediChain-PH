import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" placeholder="Juan" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Dela Cruz" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">I am a...</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="patient">Patient</SelectItem>
                <SelectItem value="doctor">Doctor</SelectItem>
                <SelectItem value="hospital">Hospital Administrator</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <Button className="w-full">Create Account</Button>
          <div className="text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}