import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type Props = {
  index: number;
  removeImageUrl: () => void;
};

const ImageUrlInput = ({ index, removeImageUrl }: Props) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-row items-end gap-2">
      <FormField
        control={control}
        name={`imageUrl.${index}`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Image Url
              <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" />
            </FormControl>
          </FormItem>
        )}
      />
      <Button
        type="button"
        onClick={removeImageUrl}
        className="bg-red-500 max-h-fit"
      >
        Remove
      </Button>
    </div>
  );
};

export default ImageUrlInput;
