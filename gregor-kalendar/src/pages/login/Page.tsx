import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { useState } from "react"

export default function LoginPage() {


  const [email, setEmail] = useState<string>('')

  const handleLogin = async () => {
    try {
      const response = await fetch(`/api/user?email=${email}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Store the response data in localStorage
      localStorage.setItem('apiData', JSON.stringify({name: data.name, email: data.email}))

      window.location.href = '/dashboard'
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }

  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <img
              src="https://www.cs.ubc.ca/sites/default/files/styles/profile_page/public/people/gregor-kiczales-2023-profile.jpg?h=8c577723&itok=HQl4iF8Z"
              alt="Gregor Kalender Logo"
              width={64}
              height={64}
              className="rounded-full"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            Sign in to access your Gregor Kalendar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="m@example.com"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Password
            </label>
            <Input
              id="password"
              type="password"
              className="w-full"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleLogin}>Sign In</Button>
        </CardFooter>
        <div className="text-center pb-4">
          <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
        </div>
      </Card>
    </div>
  )
}

