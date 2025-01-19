import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { useParams } from "react-router-dom";

export default function TeamPage() {

    const { id } = useParams();
    console.log(id)

    return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Team Dashboard</h1>
      
      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="slots">Slots</TabsTrigger>
          <TabsTrigger value="team-info">Team Info</TabsTrigger>
        </TabsList>
        
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
              <CardDescription>View the current team schedule</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-64">
              <p className="text-xl text-muted-foreground">No schedule posted yet.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="availability">
          <Card>
            <CardHeader>
              <CardTitle>Availability</CardTitle>
              <CardDescription>Manage team member availability</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Availability content will be added here */}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="slots">
          <Card>
            <CardHeader>
              <CardTitle>Slots</CardTitle>
              <CardDescription>Set slots for team assignments</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Slots content will be added here */}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="team-info">
          <Card>
            <CardHeader>
              <CardTitle>Team Info</CardTitle>
              <CardDescription>View team members and information</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Team info content will be added here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

