import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
// import videoSource from "../assets/videoSource1.mp4";
import { useCallback } from "react";

const formSchema = z.object({
  searchQuery: z.string().min(1, "Search query is required"),
});

export type searchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: searchForm) => void;
  placeHolder: string;
  onReset?: () => void;
};

const SearchBar = ({ onSubmit, onReset, placeHolder }: Props) => {
  const form = useForm<searchForm>({
    resolver: zodResolver(formSchema),
  });

  const handleReset = useCallback(() => {
    form.reset({ searchQuery: "" });
    onReset?.();
  }, [onReset, form]);

  return (
    <div className="relative h-full">
      {/* Background Image */}
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full  object-cover h-[25rem] "
      >
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}

      {/* Search Bar */}
      <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={`flex items-center gap-3 justify-between border-2 rounded-full p-2 backdrop-blur-md bg-white/30 shadow-lg 
              ${
                form.formState.errors.searchQuery
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
          >
            <Search
              strokeWidth={2.5}
              size={30}
              className="text-black hidden md:block"
            />
            <FormField
              control={form.control}
              name="searchQuery"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...field}
                      className="border-none shadow-none text-xl bg-transparent focus-visible:ring-0 placeholder-black"
                      placeholder={placeHolder}
                      aria-label="Search input"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              onClick={handleReset}
              type="button"
              variant="outline"
              className="rounded-full md:block hidden"
            >
              Reset
            </Button>
            <Button
              type="submit"
              className="rounded-full bg-white text-black hover:bg-black hover:text-white transition"
            >
              Search
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SearchBar;
