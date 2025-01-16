import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import ImageSection from "./ImageSection";

const formSchema = z
  .object({
    pgName: z.string().min(1, "PG Name is required"),
    location: z.string().min(1, "Location is required"),
    rent: z.coerce.number().min(1, "Rent is required"),
    contactNumber: z.coerce.number().min(10, "Contact Number must be 10"),
    description: z.string().min(1, "Description is required"),
    imageFile: z.array(z.instanceof(File)).optional(),
    imageUrl: z.array(z.string()).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

type RoomFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (RoomFormData: FormData) => void;
  isLoading: boolean;
};

const ManageRoomForm = ({ onSave, isLoading }: Props) => {
  const form = useForm<RoomFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pgName: "",
      location: "",
      rent: 0,
      description: "",
      contactNumber:0
    },
  });

  const submitData = (formDataJson: RoomFormData) => {
    console.log("Form data:", formDataJson);
    console.log("Image files:", formDataJson.imageFile);

    // This should be an array of File objects

    const formData = new FormData();
    formData.append("pgName", formDataJson.pgName);
    formData.append("location", formDataJson.location);
    formData.append("rent", formDataJson.rent.toString());
    formData.append("contactNumber", formDataJson.contactNumber.toString());
    formData.append("description", formDataJson.description);

    // Check if image files are present and append them
    if (formDataJson.imageFile && Array.isArray(formDataJson.imageFile)) {
      formDataJson.imageFile.forEach((file) => {
        formData.append("imageFile", file); // Append each file with the same key
      });
    }
    console.log("FormData content:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    onSave(formData); // Submit the form data
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className="space-y-4 bg-gray-50 rounded-lg p-10"
        onSubmit={(e) => {
          form.handleSubmit(submitData, (errors) => {
            console.log("Validation errors:", errors);
          })(e);
        }}
      >
        <DetailsSection />
        <ImageSection />
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit">Add Room</Button>
        )}
      </form>
    </Form>
  );
};

export default ManageRoomForm;
