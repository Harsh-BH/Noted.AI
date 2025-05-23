"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Eye, EyeOff, Lock, Mail, User, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(8, { 
    message: "Password must be at least 8 characters" 
  }).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
    { message: "Password must contain uppercase, lowercase and numbers" }
  ),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { signup, isLoading } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await signup(values.name, values.email, values.password);
      router.push("/dashboard");
    } catch (error) {
      // Error handling is already done in the signup function
      console.error("Signup submission error:", error);
    }
  }

  return (
    <div className="auth-page-container">
      <div className="logo-container animate-fadeIn">
        <div className="logo-glow"></div>
        <svg className="logo-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" className="fill-primary/20 animate-pulse" />
          <path 
            d="M30,50 Q50,30 70,50 Q50,70 30,50 Z" 
            className="fill-primary stroke-primary-foreground" 
            strokeWidth="2" 
          />
          <path 
            d="M30,50 Q50,30 70,50" 
            className="fill-none stroke-primary-foreground/50" 
            strokeWidth="1"
            strokeDasharray="2 2"
          />
        </svg>
        <h1 className="text-2xl font-bold text-primary">Noted.AI</h1>
      </div>
      
      <Card className="w-full shadow-lg animate-slideUp auth-card">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-1">
            <Sparkles className="h-5 w-5 text-primary animate-pulse mr-2" />
            <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          </div>
          <CardDescription className="text-center">
            Enter your information to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="animate-fadeIn input-wrapper" style={{ animationDelay: "0.1s" }}>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Enter your full name..." 
                          className="pl-10 transition-all focus:scale-[1.01] animated-placeholder auth-input" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="animate-fadeIn input-wrapper" style={{ animationDelay: "0.2s" }}>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Enter your email address..." 
                          className="pl-10 transition-all focus:scale-[1.01] animated-placeholder auth-input" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="animate-fadeIn input-wrapper" style={{ animationDelay: "0.3s" }}>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Create a strong password..." 
                          className="pl-10 transition-all focus:scale-[1.01] animated-placeholder auth-input" 
                          {...field} 
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1 h-8 w-8"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="animate-fadeIn input-wrapper" style={{ animationDelay: "0.4s" }}>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type={showConfirmPassword ? "text" : "password"} 
                          placeholder="Confirm your password..." 
                          className="pl-10 transition-all focus:scale-[1.01] animated-placeholder auth-input" 
                          {...field} 
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1 h-8 w-8"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 animate-fadeIn" style={{ animationDelay: "0.5s" }}>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal">
                        I agree to the{" "}
                        <Link href="/terms" className="text-primary hover:underline">
                          terms of service
                        </Link>
                        {" "}and{" "}
                        <Link href="/privacy" className="text-primary hover:underline">
                          privacy policy
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full animate-fadeIn hover:animate-button-glow" 
                style={{ animationDelay: "0.6s" }}
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </Form>
          
          <div className="flex items-center space-x-2 animate-fadeIn" style={{ animationDelay: "0.7s" }}>
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground px-2">OR</span>
            <Separator className="flex-1" />
          </div>
          
          <Button 
            variant="outline" 
            className="w-full animate-fadeIn" 
            style={{ animationDelay: "0.8s" }}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm6.804 13.138c-.073.65-.651 1.169-1.362 1.169H6.556c-.711 0-1.289-.519-1.362-1.169l-.789-6.924C4.247 5.644 4.734 5 5.419 5h13.162c.685 0 1.172.644 1.014 1.214l-.791 6.924z" fill="currentColor" />
            </svg>
            Continue with Google
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center animate-fadeIn" style={{ animationDelay: "0.9s" }}>
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
