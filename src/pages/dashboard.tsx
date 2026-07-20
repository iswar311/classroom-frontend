import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLink } from "@refinedev/core";
import { ChartContainer, ChartTooltip, ChartLegend } from "@/components/ui/chart";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
} from "recharts";

const API_URL = "http://localhost:8000";

type Summary = {
    totals: {
        users: number;
        subjects: number;
        classes: number;
        departments: number;
        enrollments: number;
    };
    recent: {
        users: any[];
        subjects: any[];
        classes: any[];
    };
};

const Dashboard = () => {
    const [summary, setSummary] = useState<Summary | null>(null);
    const [loading, setLoading] = useState(false);
    const [enrollmentTrends, setEnrollmentTrends] = useState<any[]>([]);
    const [classesByDept, setClassesByDept] = useState<any[]>([]);
    const [capacityStatus, setCapacityStatus] = useState<any[]>([]);
    const [userDistribution, setUserDistribution] = useState<any[]>([]);
    const [activity, setActivity] = useState<any | null>(null);

    const Link = useLink();

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        fetch(`${API_URL}/api/dashboard/summary`)
            .then((r) => r.json())
            .then((data) => {
                if (mounted) setSummary(data.data);
            })
            .catch((e) => console.error(e))
            .finally(() => setLoading(false));

        // fetch charts
        fetch(`${API_URL}/api/dashboard/charts/enrollment-trends?days=30`)
            .then((r) => r.json())
            .then((d) => setEnrollmentTrends(d.data || []))
            .catch(() => {});

        fetch(`${API_URL}/api/dashboard/charts/classes-by-dept`)
            .then((r) => r.json())
            .then((d) => setClassesByDept(d.data || []))
            .catch(() => {});

        fetch(`${API_URL}/api/dashboard/charts/capacity-status`)
            .then((r) => r.json())
            .then((d) => setCapacityStatus(d.data || []))
            .catch(() => {});

        fetch(`${API_URL}/api/dashboard/charts/user-distribution`)
            .then((r) => r.json())
            .then((d) => setUserDistribution(d.data || []))
            .catch(() => {});

        fetch(`${API_URL}/api/dashboard/activity`)
            .then((r) => r.json())
            .then((d) => setActivity(d.data || null))
            .catch(() => {});

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card>
                <CardHeader>
                    <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading && <div>Loading...</div>}
                    {summary && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-muted rounded">
                                <div className="text-sm text-muted-foreground">Users</div>
                                <div className="text-2xl font-bold">{summary.totals.users}</div>
                            </div>
                            <div className="p-4 bg-muted rounded">
                                <div className="text-sm text-muted-foreground">Subjects</div>
                                <div className="text-2xl font-bold">{summary.totals.subjects}</div>
                            </div>
                            <div className="p-4 bg-muted rounded">
                                <div className="text-sm text-muted-foreground">Classes</div>
                                <div className="text-2xl font-bold">{summary.totals.classes}</div>
                            </div>
                            <div className="p-4 bg-muted rounded">
                                <div className="text-sm text-muted-foreground">Departments</div>
                                <div className="text-2xl font-bold">{summary.totals.departments}</div>
                            </div>
                            <div className="col-span-2 p-4 bg-muted rounded">
                                <div className="text-sm text-muted-foreground">Enrollments</div>
                                <div className="text-2xl font-bold">{summary.totals.enrollments}</div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Quick Navigation</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-2">
                        <Button asChild variant="outline">
                            <Link to="/users">Manage Users</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link to="/subjects">Manage Subjects</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link to="/classes">Manage Classes</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link to="/departments">Manage Departments</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Enrollment Trends (30 days)</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{ series: { label: "Enrollments" } }}>
                        <LineChart data={enrollmentTrends}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <div className="col-span-2 grid grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Classes by Department</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={{ dept: { label: "Departments" } }}>
                            <BarChart data={classesByDept}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="dept" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#82ca9d" />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Capacity Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={{ status: { label: "Status" } }}>
                            <PieChart>
                                <Pie data={capacityStatus} dataKey="value" nameKey="key" innerRadius={40} outerRadius={80} fill="#8884d8">
                                    {capacityStatus.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={["#60a5fa", "#f97316", "#ef4444"][index % 3]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                    </ChartContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>User Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={{ role: { label: "Roles" } }}>
                            <PieChart>
                                <Pie data={userDistribution} dataKey="value" nameKey="role" innerRadius={40} outerRadius={80}>
                                    {userDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={["#34d399", "#60a5fa", "#f472b6", "#f59e0b"][index % 4]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Activity Feed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {activity ? (
                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm font-medium">Recent Enrollments</div>
                                    <ul className="mt-2 list-disc pl-5">
                                        {activity.recentEnrollments.map((e: any) => (
                                            <li key={e.id}>Student {e.studentId} enrolled in class {e.classId}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <div className="text-sm font-medium">New Classes</div>
                                    <ul className="mt-2 list-disc pl-5">
                                        {activity.recentCreatedClasses.map((c: any) => (
                                            <li key={c.id}>{c.name}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <div className="text-sm font-medium">New Users</div>
                                    <ul className="mt-2 list-disc pl-5">
                                        {activity.recentUsers.map((u: any) => (
                                            <li key={u.id}>{u.name ?? u.email}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div>No recent activity</div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
