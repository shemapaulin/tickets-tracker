import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"



export default function FieldDemo() {
  return (
    <div className="w-full max-w-md bg-background p-4  rounded-lg shadow-lg">
      <form className=" h-[80%] w-full space-y-4">
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Complaint Form</FieldLegend>
            <FieldDescription>
              Please fill out the following details to submit your complaint
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                 Full Name
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-name-43j"
                  placeholder="Evil Rabbit"
                  required
                />
              </Field>
              
            </FieldGroup>
          </FieldSet>
        <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Complaint Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">Complaint 1</SelectItem>
                <SelectItem value="2">Complaint 2</SelectItem>
                <SelectItem value="3">Complaint 3</SelectItem>
                <SelectItem value="4">Complaint 4</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-optional-comments">
                 Description
                </FieldLabel>
                <Textarea
                  id="checkout-7j9-optional-comments"
                  placeholder="Describe your complaint here..."
                  className="resize-none"
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
