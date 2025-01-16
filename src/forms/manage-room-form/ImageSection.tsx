import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const ImageSection = () => {
  const { control } = useFormContext();
  return (
    <div className="space-y-2">
      <h2>Add Images</h2>
      <FormField
        control={control}
        name="imageFile"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                className="bg-white"
                type="file"
                accept=".jpg, .jpeg, .png"
                multiple
                onChange={(event) => {
                    const filesArray = event.target.files ? Array.from(event.target.files) : [];
                    console.log("Files array:", filesArray);
                    field.onChange(filesArray);
                  }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ImageSection;
