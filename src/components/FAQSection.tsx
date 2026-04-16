import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/lib/data";
import { HelpCircle, ChevronRight, Sparkles } from "lucide-react";

const FAQSection = ({ limit }: { limit?: number }) => {
  const items = limit ? faqs.slice(0, limit) : faqs;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative mb-10 text-center">
        <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-20 h-20 bg-primary/5 rounded-full blur-2xl" />
        <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 mb-4">
          <HelpCircle className="w-7 h-7 text-primary" />
        </div>
        <Sparkles className="absolute top-0 right-1/4 w-4 h-4 text-amber-500 animate-pulse" />
        <Sparkles className="absolute top-2 left-1/4 w-3 h-3 text-primary/60 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
      
      <Accordion type="single" collapsible className="space-y-4">
        {items.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="group relative bg-gradient-to-br from-card to-card/80 border border-border/60 rounded-2xl px-5 overflow-hidden data-[state=open]:border-primary/40 data-[state=open]:from-primary/5 data-[state=open]:to-transparent transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-data-[state=open]:opacity-100 transition-opacity duration-500" />
            
            <div className="relative flex items-center gap-4">
              <AccordionTrigger className="flex-1 text-base font-semibold font-body text-foreground hover:text-primary py-5 hover:no-underline [-webkit-tap-highlight-color:transparent]">
                <span className="flex items-center gap-2">
                  {faq.question}
                </span>
              </AccordionTrigger>
              
              <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-data-[state=open]:text-primary group-data-[state=open]:rotate-90 transition-all duration-300 flex-shrink-0" />
            </div>
            
            <AccordionContent className="relative ml-2 mt-1">
              <div className="text-base text-muted-foreground font-body leading-relaxed pl-4 border-l-2 border-primary/20">
                {faq.answer}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground font-body">
          Still have questions?{" "}
          <a href="/contact" className="text-primary font-medium hover:underline hover:underline-offset-4">
            Contact us
          </a>
        </p>
      </div>
    </div>
  );
};

export default FAQSection;
