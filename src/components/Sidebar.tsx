
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useToast } from "./ui/use-toast";

export const ProfileSidebar = () => (
  <Card className="p-4">
    <div className="text-center">
      <div className="h-20 w-20 rounded-full bg-primary/10 mx-auto mb-4" />
      <h2 className="font-semibold">John Doe</h2>
      <p className="text-sm text-muted-foreground">Software Engineer</p>
      <div className="mt-4 border-t pt-4">
        <div className="text-sm">
          <div className="flex justify-between mb-2">
            <span>Profile views</span>
            <span className="font-semibold">127</span>
          </div>
          <div className="flex justify-between">
            <span>Post impressions</span>
            <span className="font-semibold">1,204</span>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

export const SuggestionsSidebar = () => {
  const { toast } = useToast();

  const handleConnect = () => {
    toast({
      title: "Connection request sent!",
      description: "We'll notify you when they respond.",
    });
  };

  const suggestions = [
    { name: "Emily Chen", role: "Product Manager", mutual: 12 },
    { name: "Michael Ross", role: "Frontend Developer", mutual: 8 },
    { name: "Sarah Kim", role: "UX Designer", mutual: 15 },
  ];

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">People you may know</h3>
      <div className="space-y-4">
        {suggestions.map((person) => (
          <div key={person.name} className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10" />
            <div className="flex-1">
              <h4 className="font-medium">{person.name}</h4>
              <p className="text-sm text-muted-foreground">{person.role}</p>
              <p className="text-xs text-muted-foreground">{person.mutual} mutual connections</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={handleConnect}
              >
                Connect
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
