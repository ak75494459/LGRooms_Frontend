import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import ImageUrlInput from "./ImageUrlInput";
import { Button } from "@/components/ui/button";

const ImageUrlSection = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "imageUrl",
  });
  return (
    <div className="space-y-2">
      <div>
        <FormDescription className="font-bold mt-3">
          Add Image URL here:
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="imageUrl"
        render={() => (
          <FormItem className="flex flex-col gap-2">
            {fields.map((_, index) => (
              <ImageUrlInput
                index={index}
                removeImageUrl={() => remove(index)}
              />
            ))}
          </FormItem>
        )}
      />
      <Button
        style={{ marginBottom: "10px" }}
        type="button"
        onClick={() => append({})}
      >
        Add ImageUrl
      </Button>
    </div>
  );
};

export default ImageUrlSection;
