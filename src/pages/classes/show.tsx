import React from 'react'
import {useShow} from "@refinedev/core";
import {ClassDetails} from "@/types";
import {ShowView, ShowViewHeader} from "@/components/refine-ui/views/show-view.tsx";
import {Card} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Button} from "@/components/ui/button.tsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import { AdvancedImage } from "@cloudinary/react";
import {bannerPhoto} from "@/lib/cloudinary.ts";

type JoinDialogProps = { capacity: number; enrolled: number };

function JoinDialog({ capacity, enrolled }: JoinDialogProps) {
    const { data: identity } = useGetIdentity<{ id: string; role?: string }>();
    const [open, setOpen] = useState(false);
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleJoin = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            if (!identity?.id) throw new Error("You must be signed in to join");
            const res = await fetch('/api/classes/join', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code, studentId: identity.id }) });
            if (!res.ok) {
                const body = await res.json().catch(() => null);
                throw new Error(body?.error || body?.message || `HTTP ${res.status}`);
            }
            setSuccess(true);
        } catch (err: any) {
            setError(err?.message || 'Failed to join');
        } finally { setLoading(false); }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="lg" className="w-full">Join Class</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Join Class</DialogTitle>
                </DialogHeader>

                <div className="space-y-2">
                    <Input placeholder="Enter invite code" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} />
                    {error && <div className="text-sm text-red-600">{error}</div>}
                    {success && <div className="text-sm text-green-600">Joined successfully</div>}
                    {enrolled >= capacity && <div className="text-sm text-yellow-800">Class is at capacity ({enrolled}/{capacity}).</div>}
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleJoin} disabled={loading || enrolled >= capacity}>{loading ? 'Joining…' : 'Join'}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

const Show = () => {
    const { query } = useShow<ClassDetails>({ resource: 'classes' });

    const classDetails = query.data?.data;
    const { isLoading, isError } = query;

    if(isLoading || isError || !classDetails) {
        return (
            <ShowView className="class-view class-show">
                <ShowViewHeader resource="classes" title="Class Details" />

                <p className="state-message">
                    {isLoading ? 'Loading class details...'
                        : isError ? 'Failed to load class details...'
                            : 'Class details not found'}
                </p>
            </ShowView>
        )
    }

    const teacherName = classDetails.teacher?.name ?? 'Unknown';
    const teachersInitials =
            teacherName
                .split(' ')
                .filter(Boolean)
                .slice(0, 2)
                .map((part) => part[0]?.toUpperCase())
                .join('')

    const placeholderUrl = `https://placehold.co/600x400?text=${encodeURIComponent(teachersInitials || 'NA')}`;

    const { name,  description,  status,  capacity,   bannerUrl,  bannerCldPubId,  subject,  teacher,  department  } = classDetails;

    return (
        <ShowView className="class-view class-show">
            <ShowViewHeader resource="classes" title="Class Details" />

            <div className="banner">
                {bannerUrl ? (
                    <AdvancedImage alt="Class Banner" cldImg={bannerPhoto(bannerCldPubId ?? '', name)} />
                ) : <div className="placeholder" />}
            </div>

            <Card className="details-card">
                <div className="details-header">
                    <div>
                        <h1>{name}</h1>
                        <p>{description}</p>
                    </div>

                    <div>
                        <Badge variant="outline">{capacity} spots</Badge>
                        <Badge variant={status == 'active' ? 'default' : 'secondary'} data-status={status}>{status.toUpperCase()}</Badge>
                    </div>
                </div>

                <div className="details-grid">
                    <div className="instructor">
                        <p>Instructor</p>
                        <div>
                            <img src={teacher?.image ?? placeholderUrl} alt={teacherName} />

                            <div>
                                <p>{teacherName}</p>
                                <p>{teacher?.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="department">
                        <p>Department</p>

                        <div>
                            <p>{department?.name}</p>
                            <p>{department?.description}</p>
                        </div>
                    </div>
                </div>

                <Separator />

                <div className="subject">
                    <p>Subject</p>

                    <div>
                        <Badge variant="outline">Code: {subject?.code}</Badge>
                        <p>{subject?.name}</p>
                        <p>{subject?.description}</p>
                    </div>
                </div>

                <Separator />

                <div className="join">
                    <h2>Join Class</h2>

                    <ol>
                        <li>Ask your teacher for the invite code</li>
                        <li>Click on "Join Class" button</li>
                        <li>Paste the code and click "join"</li>
                    </ol>
                </div>

                {/* Join dialog */}
                <JoinDialog capacity={capacity} enrolled={(classDetails as any).enrolledCount ?? 0} />
            </Card>
        </ShowView>
    )
}

export default Show
