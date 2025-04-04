import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { useCallback } from "react";

const formSchema = z.object({
  searchQuery: z.string().min(1, "Search query is required"),
});

export type searchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: searchForm) => void;
  placeHolder: string;
  onReset?: () => void;
  page: number;
};

const SearchBar = ({ onSubmit, onReset, placeHolder, page }: Props) => {
  const form = useForm<searchForm>({
    resolver: zodResolver(formSchema),
  });

  const handleReset = useCallback(() => {
    form.reset({ searchQuery: "" });
    onReset?.();
  }, [onReset, form]);

  return (
    <div
      className={`relative ${
        page === 1 ? "bottom-[22rem]" : "bottom-0"
      } left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl z-100`}
    >
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
  );
};

export default SearchBar;
