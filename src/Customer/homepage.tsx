import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  HelpCircle,
  MessageSquareText,
  Search,
  ShieldCheck,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* =========================================================
   TYPES
========================================================= */

type ModalStep =
  | "register"
  | "complaint"
  | "success";

type Customer = {
  id: string;
  firstName: string;
  email: string;
};

/* =========================================================
   REGISTRATION VALIDATION
========================================================= */

const accountSchema = z.object({
  fullName: z
    .string()
    .min(2, "Please enter your full name"),

  email: z
    .string()
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .min(10, "Please enter a valid phone number"),

  password: z
    .string()
    .min(
      8,
      "Password must contain at least 8 characters"
    ),

  confirmPassword: z
    .string()
    .min(8, "Please confirm your password"),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
);

type AccountForm = z.infer<typeof accountSchema>;

/* =========================================================
   COMPLAINT VALIDATION
========================================================= */

const complaintSchema = z.object({
  subject: z
    .string()
    .min(
      5,
      "Subject must contain at least 5 characters"
    ),

  category: z
    .string()
    .min(1, "Please select a category"),

  description: z
    .string()
    .min(
      20,
      "Please provide at least 20 characters"
    ),
});

type ComplaintForm = z.infer<
  typeof complaintSchema
>;

/* =========================================================
   COMPONENT
========================================================= */

const CustomerHome = () => {

  /* =======================================================
     CUSTOMER STATE
  ======================================================= */

  const [customer, setCustomer] =
    useState<Customer | null>(null);

  /* =======================================================
     DIALOG STATE
  ======================================================= */

  const [open, setOpen] = useState(false);

  const [modalStep, setModalStep] =
    useState<ModalStep>("register");

  const [complaintNumber, setComplaintNumber] =
    useState("");

  /* =======================================================
     REGISTRATION FORM
  ======================================================= */

  const {
    register,
    handleSubmit,
    reset: resetAccount,
    formState: {
      errors: accountErrors,
      isSubmitting: registering,
    },
  } = useForm<AccountForm>({
    resolver: zodResolver(accountSchema),
  });

  /* =======================================================
     COMPLAINT FORM
  ======================================================= */

  const {
    register: registerComplaint,
    handleSubmit: handleComplaintSubmit,
    reset: resetComplaint,
    setValue,
    watch,
    formState: {
      errors: complaintErrors,
      isSubmitting: submittingComplaint,
    },
  } = useForm<ComplaintForm>({
    resolver: zodResolver(complaintSchema),
  });

  const selectedCategory =
    watch("category");

  /* =======================================================
     OPEN CREATE COMPLAINT
  ======================================================= */

  const handleCreateComplaint = () => {

    if (customer) {
      setModalStep("complaint");
    } else {
      setModalStep("register");
    }

    setOpen(true);
  };

  /* =======================================================
     REGISTER CUSTOMER
  ======================================================= */

  const onRegister = async (
    data: AccountForm
  ) => {

    /*
      ============================================
      REAL API GOES HERE
      ============================================

      Example:

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      setCustomer(result.user);

      ============================================
    */

    await new Promise(
      (resolve) =>
        setTimeout(resolve, 1000)
    );

    const firstName =
      data.fullName.trim().split(" ")[0];

    const newCustomer: Customer = {
      id: Date.now().toString(),
      firstName,
      email: data.email,
    };

    setCustomer(newCustomer);

    resetAccount();

    /*
      Move from registration
      to complaint form
    */

    setModalStep("complaint");
  };

  /* =======================================================
     SUBMIT COMPLAINT
  ======================================================= */

  const onSubmitComplaint = async (
    data: ComplaintForm
  ) => {

    /*
      ============================================
      REAL API GOES HERE
      ============================================

      Example:

      await fetch(
        "http://localhost:5000/api/complaints",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerId: customer?.id,
            ...data,
          }),
        }
      );

      ============================================
    */

    await new Promise(
      (resolve) =>
        setTimeout(resolve, 1200)
    );

    const generatedNumber =
      `CMP-${Math.floor(
        1000 + Math.random() * 9000
      )}`;

    setComplaintNumber(
      generatedNumber
    );

    resetComplaint();

    setModalStep("success");
  };

  /* =======================================================
     CLOSE DIALOG
  ======================================================= */

  const handleDialogChange = (
    value: boolean
  ) => {

    setOpen(value);

    if (!value) {
      setModalStep(
        customer
          ? "complaint"
          : "register"
      );
    }
  };

  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ===================================================
          NAVBAR
      =================================================== */}

      <header className="absolute left-0 right-0 top-0 z-50">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* LOGO */}

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur">

              <MessageSquareText
                className="h-5 w-5 text-white"
              />

            </div>

            <span className="text-xl font-bold text-white">
              SupportDesk
            </span>

          </div>

          {/* DESKTOP NAVIGATION */}

          <nav className="hidden items-center gap-8 text-sm text-white/75 md:flex">

            <a
              href="#home"
              className="transition hover:text-white"
            >
              Home
            </a>

            <a
              href="#support"
              className="transition hover:text-white"
            >
              Support
            </a>

            <a
              href="#how-it-works"
              className="transition hover:text-white"
            >
              How It Works
            </a>

            <a
              href="#contact"
              className="transition hover:text-white"
            >
              Contact
            </a>

          </nav>

          {/* RIGHT SIDE */}

          <div className="flex items-center gap-3">

            {/* CUSTOMER */}

            {customer && (

              <div className="hidden items-center gap-2 sm:flex">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-sm font-semibold text-white">

                  {customer.firstName
                    .charAt(0)
                    .toUpperCase()}

                </div>

                <span className="text-sm font-medium text-white">
                  {customer.firstName}
                </span>

              </div>

            )}

            {/* CREATE COMPLAINT */}

            <Button
              onClick={
                handleCreateComplaint
              }
              className="rounded-full bg-white px-5 text-slate-900 shadow-lg hover:bg-white/90"
            >

              Create Complaint

              <ArrowRight
                className="ml-2 h-4 w-4"
              />

            </Button>

          </div>

        </div>

      </header>


      {/* ===================================================
          HERO
      =================================================== */}

      <section
        id="home"
        className="relative flex min-h-[700px] items-center overflow-hidden"
      >

        {/* BACKGROUND */}

        <div className="absolute inset-0 bg-slate-950" />

        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-blue-600/30 blur-[130px]" />

        <div className="absolute -bottom-40 right-0 h-[600px] w-[600px] rounded-full bg-indigo-600/30 blur-[130px]" />

        {/* GRID */}

        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize:
              "50px 50px",
          }}
        />

        {/* HERO CONTENT */}

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 pb-20 pt-32 md:grid-cols-2">

          {/* LEFT */}

          <div className="max-w-2xl">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur">

              <span className="h-2 w-2 rounded-full bg-green-400" />

              We're here to help

            </div>

            <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl">

              We're listening.

              <br />

              <span className="text-blue-400">
                Let's solve it together.
              </span>

            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">

              Have a complaint, question,
              or issue that needs attention?
              Tell us what happened and our
              support team will make sure your
              request reaches the right people.

            </p>

            {/* BUTTONS */}

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">

              <Button
                size="lg"
                onClick={
                  handleCreateComplaint
                }
                className="h-12 rounded-full px-7"
              >

                Submit a Complaint

                <ArrowRight
                  className="ml-2 h-5 w-5"
                />

              </Button>


              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-white/20 bg-white/5 px-7 text-white hover:bg-white/10 hover:text-white"
              >

                <Search
                  className="mr-2 h-5 w-5"
                />

                Track My Complaint

              </Button>

            </div>

            {/* TRUST */}

            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-white/50">

              <div className="flex items-center gap-2">

                <ShieldCheck
                  className="h-4 w-4"
                />

                Secure

              </div>

              <div className="flex items-center gap-2">

                <Clock3
                  className="h-4 w-4"
                />

                Fast response

              </div>

              <div className="flex items-center gap-2">

                <CheckCircle2
                  className="h-4 w-4"
                />

                Trackable

              </div>

            </div>

          </div>

          {/* ===================================================
              RIGHT HERO CARD
          =================================================== */}

          <div className="hidden justify-center md:flex">

            <div className="relative w-full max-w-md">

              <div className="absolute -inset-4 rounded-3xl bg-blue-500/10 blur-2xl" />

              {customer && complaintNumber ? (

                /* ================================================
                   CUSTOMER HAS SUBMITTED A COMPLAINT
                ================================================ */

                <Card className="relative overflow-hidden border-white/10 bg-white/[0.07] text-white shadow-2xl backdrop-blur-xl">

                  <CardContent className="p-7">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-sm text-white/50">
                          Your request
                        </p>

                        <h3 className="mt-1 text-xl font-semibold">
                          Complaint #{complaintNumber}
                        </h3>

                      </div>

                      <div className="rounded-full bg-blue-500/15 px-3 py-1 text-xs text-blue-300">
                        Submitted
                      </div>

                    </div>

                    {/* TRACKER */}

                    <div className="my-8 space-y-5">

                      {/* SUBMITTED */}

                      <div className="flex gap-4">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-500/15">

                          <CheckCircle2
                            className="h-5 w-5 text-green-400"
                          />

                        </div>

                        <div>

                          <p className="font-medium">
                            Complaint Submitted
                          </p>

                          <p className="text-sm text-white/40">
                            Your complaint was successfully received
                          </p>

                        </div>

                      </div>

                      <div className="ml-4 h-7 border-l border-dashed border-white/20" />

                      {/* UNDER REVIEW */}

                      <div className="flex gap-4">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500/15">

                          <Clock3
                            className="h-5 w-5 text-blue-400"
                          />

                        </div>

                        <div>

                          <p className="font-medium">
                            Under Review
                          </p>

                          <p className="text-sm text-white/40">
                            Our team will review your complaint
                          </p>

                        </div>

                      </div>

                      <div className="ml-4 h-7 border-l border-dashed border-white/20" />

                      {/* IN PROGRESS */}

                      <div className="flex gap-4 opacity-40">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">

                          <MessageSquareText
                            className="h-5 w-5"
                          />

                        </div>

                        <div>

                          <p className="font-medium">
                            In Progress
                          </p>

                          <p className="text-sm">
                            Our team is working on your issue
                          </p>

                        </div>

                      </div>

                      <div className="ml-4 h-7 border-l border-dashed border-white/20" />

                      {/* RESOLVED */}

                      <div className="flex gap-4 opacity-40">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">

                          <CheckCircle2
                            className="h-5 w-5"
                          />

                        </div>

                        <div>

                          <p className="font-medium">
                            Resolved
                          </p>

                          <p className="text-sm">
                            Your issue has been resolved
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* FOOTER */}

                    <div className="rounded-xl bg-white/5 p-4">

                      <p className="text-sm text-white/50">
                        Keep your complaint number
                      </p>

                      <p className="mt-1 font-medium">
                        {complaintNumber}
                      </p>

                    </div>

                  </CardContent>

                </Card>

              ) : (

                /* ================================================
                   BEFORE CUSTOMER SUBMITS A COMPLAINT
                ================================================ */

                <Card className="relative overflow-hidden border-white/10 bg-white/[0.07] text-white shadow-2xl backdrop-blur-xl">

                  <CardContent className="p-7">

                    <div className="flex items-center gap-4">

                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15">

                        <MessageSquareText
                          className="h-6 w-6 text-blue-400"
                        />

                      </div>

                      <div>

                        <p className="text-sm text-white/50">
                          Your support journey
                        </p>

                        <h3 className="text-xl font-semibold">
                          We're here to help
                        </h3>

                      </div>

                    </div>

                    {/* JOURNEY */}

                    <div className="my-8 space-y-6">

                      {/* STEP 1 */}

                      <div className="flex gap-4">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-sm font-semibold text-blue-400">

                          1

                        </div>

                        <div>

                          <p className="font-medium">
                            Tell us what happened
                          </p>

                          <p className="text-sm text-white/40">
                            Submit your complaint in just a few steps
                          </p>

                        </div>

                      </div>

                      {/* LINE */}

                      <div className="ml-4 h-6 border-l border-dashed border-white/20" />

                      {/* STEP 2 */}

                      <div className="flex gap-4">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white/50">

                          2

                        </div>

                        <div>

                          <p className="font-medium">
                            We review your complaint
                          </p>

                          <p className="text-sm text-white/40">
                            Your request reaches the right team
                          </p>

                        </div>

                      </div>

                      {/* LINE */}

                      <div className="ml-4 h-6 border-l border-dashed border-white/20" />

                      {/* STEP 3 */}

                      <div className="flex gap-4">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white/50">

                          3

                        </div>

                        <div>

                          <p className="font-medium">
                            Follow your progress
                          </p>

                          <p className="text-sm text-white/40">
                            Track your complaint until it's resolved
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* INFO */}

                    <div className="rounded-xl bg-white/5 p-4">

                      <div className="flex items-center gap-3">

                        <ShieldCheck className="h-5 w-5 text-green-400" />

                        <div>

                          <p className="text-sm font-medium">
                            Safe & trackable
                          </p>

                          <p className="text-xs text-white/40">
                            Every complaint gets a unique tracking number
                          </p>

                        </div>

                      </div>

                    </div>

                  </CardContent>

                </Card>

              )}

            </div>

          </div>

        </div>

      </section>


      {/* ===================================================
          SUPPORT
      =================================================== */}

      <section
        id="support"
        className="bg-muted/40 py-24"
      >

        <div className="mx-auto max-w-7xl px-6">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              How can we help?
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Tell us what you need
            </h2>

            <p className="mt-4 text-muted-foreground">
              Choose a category or submit
              your complaint directly.
            </p>

          </div>


          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {[
              {
                icon: MessageSquareText,
                title: "General Support",
                description:
                  "Questions about our services or products.",
              },
              {
                icon: FileText,
                title: "Make a Complaint",
                description:
                  "Tell us about an issue that needs attention.",
              },
              {
                icon: Search,
                title: "Track a Complaint",
                description:
                  "Check the progress of an existing complaint.",
              },
              {
                icon: HelpCircle,
                title: "Need Help?",
                description:
                  "Find answers or get in touch with our team.",
              },
            ].map((item) => (

              <Card
                key={item.title}
                className="group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
              >

                <CardContent className="p-6">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">

                    <item.icon
                      className="h-6 w-6"
                    />

                  </div>

                  <h3 className="mt-5 font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>

                  <div className="mt-5 flex items-center text-sm font-medium text-primary">

                    Learn more

                    <ArrowRight
                      className="ml-2 h-4 w-4"
                    />

                  </div>

                </CardContent>

              </Card>

            ))}

          </div>

        </div>

      </section>


      {/* ===================================================
          HOW IT WORKS
      =================================================== */}

      <section
        id="how-it-works"
        className="py-24"
      >

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <h2 className="text-3xl font-bold md:text-4xl">
              Simple. Transparent. Trackable.
            </h2>

            <p className="mt-4 text-muted-foreground">
              Getting help shouldn't be complicated.
            </p>

          </div>


          <div className="mt-14 grid gap-8 md:grid-cols-3">

            {[
              {
                number: "01",
                title:
                  "Submit your complaint",
                text:
                  "Tell us what happened and provide the details we need.",
              },
              {
                number: "02",
                title:
                  "We review it",
                text:
                  "Your complaint is assigned to the right team.",
              },
              {
                number: "03",
                title:
                  "Get a resolution",
                text:
                  "Follow your complaint until the issue is resolved.",
              },
            ].map((item) => (

              <div
                key={item.number}
              >

                <span className="text-6xl font-bold text-muted/60">
                  {item.number}
                </span>

                <h3 className="mt-3 text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-muted-foreground">
                  {item.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ===================================================
          CTA
      =================================================== */}

      <section
        id="contact"
        className="px-6 pb-24"
      >

        <div className="mx-auto max-w-7xl rounded-3xl bg-slate-950 px-8 py-16 text-center text-white md:px-16">

          <h2 className="text-3xl font-bold md:text-4xl">
            Have something you'd like us to know?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Your feedback helps us improve.
            Submit your complaint today and
            we'll make sure it gets the attention
            it deserves.
          </p>

          <Button
            size="lg"
            onClick={
              handleCreateComplaint
            }
            className="mt-8 rounded-full px-8"
          >

            Create a Complaint

            <ArrowRight
              className="ml-2 h-5 w-5"
            />

          </Button>

        </div>

      </section>


      {/* ===================================================
          CREATE ACCOUNT / COMPLAINT DIALOG
      =================================================== */}

      <Dialog
        open={open}
        onOpenChange={
          handleDialogChange
        }
      >

        <DialogContent className="overflow-hidden p-0 sm:max-w-xl">

          {/* =================================================
              REGISTRATION
          ================================================= */}

          {modalStep === "register" && (

            <div className="animate-in slide-in-from-right duration-500">

              <div className="p-6">

                <DialogHeader>

                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">

                    <User
                      className="h-6 w-6"
                    />

                  </div>

                  <DialogTitle className="text-2xl">
                    Create your account
                  </DialogTitle>

                  <DialogDescription>
                    Create an account to submit
                    and track your complaints.
                  </DialogDescription>

                </DialogHeader>


                <form
                  onSubmit={
                    handleSubmit(onRegister)
                  }
                  className="mt-6 space-y-4"
                >

                  {/* NAME */}

                  <div className="space-y-2">

                    <Label htmlFor="fullName">
                      Full name
                    </Label>

                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      {...register(
                        "fullName"
                      )}
                    />

                    {accountErrors.fullName && (

                      <p className="text-sm text-destructive">

                        {
                          accountErrors
                            .fullName
                            .message
                        }

                      </p>

                    )}

                  </div>


                  {/* EMAIL */}

                  <div className="space-y-2">

                    <Label htmlFor="email">
                      Email address
                    </Label>

                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      {...register(
                        "email"
                      )}
                    />

                    {accountErrors.email && (

                      <p className="text-sm text-destructive">

                        {
                          accountErrors
                            .email
                            .message
                        }

                      </p>

                    )}

                  </div>


                  {/* PHONE */}

                  <div className="space-y-2">

                    <Label htmlFor="phone">
                      Phone number
                    </Label>

                    <Input
                      id="phone"
                      placeholder="+250 7XX XXX XXX"
                      {...register(
                        "phone"
                      )}
                    />

                    {accountErrors.phone && (

                      <p className="text-sm text-destructive">

                        {
                          accountErrors
                            .phone
                            .message
                        }

                      </p>

                    )}

                  </div>


                  {/* PASSWORD */}

                  <div className="grid gap-4 sm:grid-cols-2">

                    <div className="space-y-2">

                      <Label htmlFor="password">
                        Password
                      </Label>

                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        {...register(
                          "password"
                        )}
                      />

                      {accountErrors.password && (

                        <p className="text-sm text-destructive">

                          {
                            accountErrors
                              .password
                              .message
                          }

                        </p>

                      )}

                    </div>


                    {/* CONFIRM */}

                    <div className="space-y-2">

                      <Label htmlFor="confirmPassword">
                        Confirm password
                      </Label>

                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        {...register(
                          "confirmPassword"
                        )}
                      />

                      {accountErrors.confirmPassword && (

                        <p className="text-sm text-destructive">

                          {
                            accountErrors
                              .confirmPassword
                              .message
                          }

                        </p>

                      )}

                    </div>

                  </div>


                  <Button
                    type="submit"
                    disabled={
                      registering
                    }
                    className="mt-3 w-full"
                  >

                    {registering
                      ? "Creating account..."
                      : "Create Account & Continue"}

                    {!registering && (
                      <ArrowRight
                        className="ml-2 h-4 w-4"
                      />
                    )}

                  </Button>


                  <p className="text-center text-xs text-muted-foreground">
                    Your information is kept
                    secure and will only be used
                    to manage your complaint.
                  </p>

                </form>

              </div>

            </div>

          )}


          {/* =================================================
              COMPLAINT
          ================================================= */}

          {modalStep === "complaint" && (

            <div className="animate-in slide-in-from-right duration-500">

              <div className="p-6">

                <DialogHeader>

                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">

                    <MessageSquareText
                      className="h-6 w-6"
                    />

                  </div>

                  <DialogTitle className="text-2xl">
                    Submit a Complaint
                  </DialogTitle>

                  <DialogDescription>
                    Tell us what happened and
                    we'll make sure it reaches
                    the right team.
                  </DialogDescription>

                </DialogHeader>


                <form
                  onSubmit={
                    handleComplaintSubmit(
                      onSubmitComplaint
                    )
                  }
                  className="mt-6 space-y-5"
                >

                  {/* SUBJECT */}

                  <div className="space-y-2">

                    <Label>
                      Complaint subject
                    </Label>

                    <Input
                      placeholder="Briefly describe your issue"
                      {...registerComplaint(
                        "subject"
                      )}
                    />

                    {complaintErrors.subject && (

                      <p className="text-sm text-destructive">

                        {
                          complaintErrors
                            .subject
                            .message
                        }

                      </p>

                    )}

                  </div>


                  {/* CATEGORY */}

                  <div className="space-y-2">

                    <Label>
                      Category
                    </Label>

                    <Select
                      value={
                        selectedCategory || ""
                      }
                      onValueChange={(
                        value
                      ) =>
                        setValue(
                          "category",
                          value ?? "",
                          {
                            shouldValidate:
                              true,
                          }
                        )
                      }
                    >

                      <SelectTrigger>

                        <SelectValue placeholder="Select a category" />

                      </SelectTrigger>

                      <SelectContent>

                        <SelectItem value="service">
                          Service Issue
                        </SelectItem>

                        <SelectItem value="billing">
                          Billing / Payment
                        </SelectItem>

                        <SelectItem value="technical">
                          Technical Problem
                        </SelectItem>

                        <SelectItem value="staff">
                          Staff / Customer Service
                        </SelectItem>

                        <SelectItem value="delivery">
                          Delivery / Product
                        </SelectItem>

                        <SelectItem value="other">
                          Other
                        </SelectItem>

                      </SelectContent>

                    </Select>

                    {complaintErrors.category && (

                      <p className="text-sm text-destructive">

                        {
                          complaintErrors
                            .category
                            .message
                        }

                      </p>

                    )}

                  </div>


                  {/* DESCRIPTION */}

                  <div className="space-y-2">

                    <Label>
                      Description
                    </Label>

                    <Textarea
                      placeholder="Please describe your complaint in detail..."
                      className="min-h-[140px] resize-none"
                      {...registerComplaint(
                        "description"
                      )}
                    />

                    {complaintErrors.description && (

                      <p className="text-sm text-destructive">

                        {
                          complaintErrors
                            .description
                            .message
                        }

                      </p>

                    )}

                  </div>


                  {/* SUBMIT */}

                  <Button
                    type="submit"
                    disabled={
                      submittingComplaint
                    }
                    className="w-full"
                  >

                    {submittingComplaint
                      ? "Submitting complaint..."
                      : "Submit Complaint"}

                    {!submittingComplaint && (

                      <ArrowRight
                        className="ml-2 h-4 w-4"
                      />

                    )}

                  </Button>

                </form>

              </div>

            </div>

          )}


          {/* =================================================
              SUCCESS
          ================================================= */}

          {modalStep === "success" && (

            <div className="animate-in fade-in zoom-in-95 duration-500 p-8 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">

                <CheckCircle2
                  className="h-9 w-9 text-green-500"
                />

              </div>


              <h2 className="mt-6 text-2xl font-bold">
                Complaint Submitted!
              </h2>


              <p className="mx-auto mt-3 max-w-sm text-muted-foreground">

                Thank you for contacting us,
                {customer &&
                  ` ${customer.firstName}`}.
                Your complaint has been
                successfully received.

              </p>


              {/* NUMBER */}

              <div className="mx-auto mt-6 max-w-xs rounded-xl border bg-muted/50 p-4">

                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Complaint Number
                </p>

                <p className="mt-1 text-xl font-bold">
                  {complaintNumber}
                </p>

              </div>


              <p className="mt-4 text-sm text-muted-foreground">

                Please keep this number to
                track your complaint.

              </p>


              <Button
                onClick={() =>
                  setOpen(false)
                }
                className="mt-7 w-full"
              >
                Done
              </Button>

            </div>

          )}

        </DialogContent>

      </Dialog>

    </div>
  );
};

export default CustomerHome;