import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { agents } from "@/Services/agents";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { Eye, EyeOff, Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [error] = useState("");
  const [loggedAgent, setLoggedAgent] = useState<any>(null);


  

 

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });



 const onSubmit = async (data: LoginForm) => {
  console.log("Form Data:", data);

  const agent = agents.find((a) => {
    console.log(a.email, a.password);

    return (
      a.email === data.email &&
      a.password === data.password
    );
  });

  console.log("Found Agent:", agent);

  if (!agent) {
    alert("Wrong email or password");
    return;
  }


  setLoggedAgent(agent);
  setOpen(true);
  <Link to={`/agent/dashboard/${loggedAgent.id}`} />;
};

  return (
    <>
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl font-bold">
              Welcome Back
            </CardTitle>

            <CardDescription>
              Login to continue to your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <div className="space-y-2">
                <Label>Email</Label>

                <Input
                  type="email"
                  placeholder="john@example.com"
                  {...register("email")}
                />

                {errors.email && (
                  <p className="text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Password</Label>

                <div className="relative">
                  <Input
                    type={
                      showPassword ? "text" : "password"
                    }
                    placeholder="••••••••"
                    {...register("password")}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {error && (
                <p className="text-sm text-red-500">
                  {error}
                </p>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember">
                    Remember me
                  </Label>
                </div>

                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                className="w-full"
                disabled={isSubmitting}
                type="submit"
                onClick={handleSubmit(onSubmit)}
                
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="font-medium text-primary hover:underline"
                >
                  Sign up
                </a>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Login Successful 🎉
            </DialogTitle>

            <DialogDescription>
              Welcome back,
              <span className="font-semibold">
                {" "}
                {loggedAgent?.name}
              </span>
              .
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              onClick={() => navigate(`/agent/dashboard/${loggedAgent.id}`)}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}