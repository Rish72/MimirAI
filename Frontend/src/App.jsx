import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Infobox from "./components/Infobox"
import Form from "./components/Form"

function App() {
    const data = [
    { title: "Youtube", favicon: "https://www.youtube.com/favicon.ico" },
    { title: "GitHub", favicon: "https://github.com/favicon.ico" },
    { title: "OpenAI", favicon: "https://openai.com/favicon.ico" },
    { title: "Stack Overflow", favicon: "https://stackoverflow.com/favicon.ico" },
    { title: "Twitter", favicon: "https://twitter.com/favicon.ico" },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-svh bg-white">
      <Form />
     <ScrollArea className="h-[300px] max-w-md mt-4 rounded-md p-2">
        <div className="flex flex-col gap-2">
          {data.map((item, index) => (
            <Infobox key={index} title={item.title} favicon={item.favicon} />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default App
