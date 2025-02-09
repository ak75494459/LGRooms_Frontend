import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PublicRoomDetailsSection from "./PublicRoomDetailsSection";
import ImageUrlSection from "./ImageUrlSection";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";

const formSchema = z.object({
  rent: z.coerce.number().min(1, "Rent is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.array(z.string().min(1, "imageUrl is required")),
});

type publicRoomFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (publicRoomFormData: FormData) => void;
  isLoading: boolean;
};

const ManagePublicRoomForm = ({ onSave, isLoading }: Props) => {
  const form = useForm<publicRoomFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rent: 0, // Default rent value to prevent undefined
      description: "",
      imageUrl: [""],
    },
  });

  const submitData = (formDataJson: publicRoomFormData) => {
    console.log("Form Data Before Submission:", formDataJson); // Debugging

    const formData = new FormData();
    formData.append("rent", formDataJson.rent.toString()); // Convert to string before sending
    formData.append("description", formDataJson.description);

    formDataJson.imageUrl.forEach((imageUrl, index) => {
      formData.append(`imageUrl[${index}]`, imageUrl);
    });

    console.log("FormData Entries:", Object.fromEntries(formData.entries())); // Debugging
    onSave(formData);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitData)}>
        <PublicRoomDetailsSection />
        <ImageUrlSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default ManagePublicRoomForm;
