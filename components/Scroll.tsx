import { ScrollArea } from "@/components/ui/scroll-area";




export default  function Scroll({children} : Readonly<{children : React.ReactNode}>)  {
    return (
        <ScrollArea>
            {children}
        </ScrollArea>
   
    )
}




