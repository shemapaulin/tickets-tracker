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

  <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">

    {/* LOGO */}

    <a
      href="#home"
      className="flex items-center gap-2.5"
    >

      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 shadow-sm">
        <MessageSquareText className="h-4.5 w-4.5 text-white" />
      </div>

      <span className="text-lg font-bold tracking-tight text-slate-900">
        Support<span className="text-emerald-600">Desk</span>
      </span>

    </a>


    {/* DESKTOP NAVIGATION */}

    <nav className="hidden items-center gap-7 md:flex">

      <a
        href="#home"
        className="text-sm font-medium text-slate-700 transition hover:text-emerald-600"
      >
        Home
      </a>

      <a
        href="#support"
        className="text-sm font-medium text-slate-700 transition hover:text-emerald-600"
      >
        Support
      </a>

      <a
        href="#how-it-works"
        className="text-sm font-medium text-slate-700 transition hover:text-emerald-600"
      >
        How It Works
      </a>

      <a
        href="#contact"
        className="text-sm font-medium text-slate-700 transition hover:text-emerald-600"
      >
        Contact
      </a>

    </nav>


    {/* RIGHT SIDE */}

   {/* RIGHT SIDE */}

<div className="flex items-center gap-3">

  {/* CUSTOMER */}

  {customer && (
    <div className="flex items-center">

      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700 ring-2 ring-white">
        {customer.firstName
          .charAt(0)
          .toUpperCase()}
      </div>

      {/* Name only on desktop */}
      <span className="ml-2 hidden text-sm font-medium text-slate-700 sm:block">
        {customer.firstName}
      </span>

    </div>
  )}


  {/* CREATE COMPLAINT */}
  {/* Hidden on mobile */}

  <Button
    onClick={handleCreateComplaint}
    size="sm"
    className="hidden h-9 rounded-full bg-emerald-600 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 sm:flex"
  >

    Create Complaint

    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />

  </Button>

</div>
  </div>

</header>

      {/* ===================================================
          HERO
      =================================================== */}

      <section
  id="home"
  className="relative flex min-h-[560px] items-center overflow-hidden bg-gradient-to-br from-white via-emerald-50/60 to-green-100/70"
>
  {/* SOFT BACKGROUND */}

  <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-emerald-200/40 blur-[100px]" />

  <div className="absolute -bottom-40 right-0 h-[450px] w-[450px] rounded-full bg-green-200/40 blur-[110px]" />

  {/* HERO CONTENT */}

  <div className="relative mx-auto flex w-full max-w-6xl items-center px-6 py-24">

    {/* LEFT */}

    <div className="max-w-2xl">

      <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-emerald-700">
        Customer Support
      </p>

      <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
        We're here to
        <span className="block text-emerald-600">
          listen and help.
        </span>
      </h1>

      <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 md:text-lg">
        Have a complaint or issue that needs attention?
        Tell us what happened and we'll make sure it
        reaches the right team.
      </p>

      {/* ONE CTA */}

      <div className="mt-7">

        <Button
          size="lg"
          onClick={handleCreateComplaint}
          className="h-11 rounded-full bg-emerald-600 px-7 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          Create a Complaint

          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

      </div>

      {/* SMALL TRUST LINE */}

      <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">

        <ShieldCheck className="h-4 w-4 text-emerald-600" />

        Simple, secure and trackable support

      </div>

    </div>


    {/* ===================================================
        RIGHT SIDE
        ONLY SHOW AFTER CUSTOMER SUBMITS A COMPLAINT
    =================================================== */}

    {customer && complaintNumber && (

      <div className="ml-auto hidden w-full max-w-sm lg:block">

        <Card className="border-emerald-100 bg-white/90 shadow-lg shadow-emerald-900/5 backdrop-blur">

          <CardContent className="p-5">

            {/* HEADER */}

            <div className="flex items-start justify-between">

              <div>

                <p className="text-xs text-slate-500">
                  Your complaint
                </p>

                <h3 className="mt-1 text-base font-semibold text-slate-900">
                  #{complaintNumber}
                </h3>

              </div>

              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-700">
                Submitted
              </span>

            </div>


            {/* TRACKER */}

            <div className="mt-6 space-y-4">

              {/* SUBMITTED */}

              <div className="flex items-start gap-3">

                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100">

                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />

                </div>

                <div>

                  <p className="text-sm font-medium text-slate-900">
                    Submitted
                  </p>

                  <p className="text-xs text-slate-500">
                    Your complaint was received.
                  </p>

                </div>

              </div>


              {/* CONNECTOR */}

              <div className="ml-3.5 h-4 border-l border-dashed border-slate-200" />


              {/* UNDER REVIEW */}

              <div className="flex items-start gap-3">

                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50">

                  <Clock3 className="h-4 w-4 text-emerald-600" />

                </div>

                <div>

                  <p className="text-sm font-medium text-slate-900">
                    Under Review
                  </p>

                  <p className="text-xs text-slate-500">
                    Our team is reviewing your request.
                  </p>

                </div>

              </div>


              {/* CONNECTOR */}

              <div className="ml-3.5 h-4 border-l border-dashed border-slate-200" />


              {/* IN PROGRESS */}

              <div className="flex items-start gap-3 opacity-40">

                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100">

                  <MessageSquareText className="h-4 w-4 text-slate-500" />

                </div>

                <div>

                  <p className="text-sm font-medium text-slate-900">
                    In Progress
                  </p>

                  <p className="text-xs text-slate-500">
                    The team is working on your issue.
                  </p>

                </div>

              </div>


              {/* CONNECTOR */}

              <div className="ml-3.5 h-4 border-l border-dashed border-slate-200" />


              {/* RESOLVED */}

              <div className="flex items-start gap-3 opacity-40">

                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100">

                  <CheckCircle2 className="h-4 w-4 text-slate-500" />

                </div>

                <div>

                  <p className="text-sm font-medium text-slate-900">
                    Resolved
                  </p>

                  <p className="text-xs text-slate-500">
                    Your issue has been resolved.
                  </p>

                </div>

              </div>

            </div>


            {/* TRACKING NUMBER */}

            <div className="mt-5 rounded-lg bg-emerald-50 p-3">

              <p className="text-[10px] font-medium uppercase tracking-wide text-emerald-700">
                Complaint number
              </p>

              <p className="mt-1 text-sm font-semibold text-emerald-900">
                {complaintNumber}
              </p>

            </div>

          </CardContent>

        </Card>

      </div>

    )}

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