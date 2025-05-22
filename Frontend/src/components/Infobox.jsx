import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Infobox({ title, url, favicon, onDelete }) {
  return (
    <div className="bg-black text-white py-4 px-8 rounded-lg shadow-md flex items-center gap-6 justify-between mb-6 ">
      <div className="flex gap-4 items-center justify-between">
        <div>
          <Avatar>
            <AvatarImage src={favicon} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <a className="text-2xl" href="https://youtube.com">{title}</a>
        </div>
      </div>
        <Button className="text-lg text-red-600 ml-4 cursor-pointer">DELETE</Button>
    </div>
  );
}
