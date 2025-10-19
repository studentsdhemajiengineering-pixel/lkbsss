
"use client";

import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Plus, Trash2, Edit } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useFirebase } from '@/firebase/provider';
import { addContent, updateContent, deleteContent } from '@/lib/services';
import type { Content } from '@/lib/types';

type ContentType = 'news' | 'videos' | 'podcasts' | 'gallery' | 'resources' | 'social';

const contentTypes: { id: ContentType, label: string, collection: string }[] = [
    { id: 'news', label: 'News', collection: 'news-articles' },
    { id: 'videos', label: 'Videos', collection: 'interviews-podcasts' },
    { id: 'podcasts', label: 'Podcasts', collection: 'interviews-podcasts' },
    { id: 'gallery', label: 'Gallery', collection: 'gallery-images' },
    { id: 'resources', label: 'Resources', collection: 'resources' },
    { id: 'social', label: 'Social Posts', collection: 'social-media-posts' },
];

const ContentManagementTab = ({ content, onDataChange }: { content: Record<string, any[]>, onDataChange: () => void }) => {
    const { firestore } = useFirebase();
    const [selectedContentType, setSelectedContentType] = useState<ContentType>('news');
    const [editingItem, setEditingItem] = useState<any | null>(null);
    const [isAddFormOpen, setAddFormOpen] = useState(false);
    const [newItem, setNewItem] = useState<any>({});
    const [loading, setLoading] = useState(false);

    const activeContent = content[selectedContentType] || [];
    const activeCollection = contentTypes.find(ct => ct.id === selectedContentType)?.collection || '';

    const handleAddContent = async () => {
        if (!firestore || !activeCollection) return;
        setLoading(true);
        try {
            await addContent(firestore, activeCollection, newItem);
            onDataChange();
            setAddFormOpen(false);
            setNewItem({});
        } catch (error) {
            console.error(`Error adding content to ${activeCollection}:`, error);
        }
        setLoading(false);
    };

    const handleEditContent = async () => {
        if (!firestore || !activeCollection || !editingItem) return;
        setLoading(true);
        try {
            const { id, ...data } = editingItem;
            await updateContent(firestore, activeCollection, id, data);
            onDataChange();
            setEditingItem(null);
        } catch (error) {
            console.error(`Error updating content in ${activeCollection}:`, error);
        }
        setLoading(false);
    };

    const handleDeleteItem = async (id: string) => {
        if (!firestore || !activeCollection) return;
        if (!confirm('Are you sure you want to delete this item?')) return;
        setLoading(true);
        try {
            await deleteContent(firestore, activeCollection, id);
            onDataChange();
        } catch (error) {
            console.error(`Error deleting content from ${activeCollection}:`, error);
        }
        setLoading(false);
    };

    const getStats = (item: any, type: ContentType) => {
        if (type === 'news' || type === 'videos') return `${item.views || 0} views`;
        if (type === 'social') return `${item.likes || 0} likes`;
        if (type === 'podcasts') return `${item.listens || 0} listens`;
        return 'N/A';
    }

    const renderDialogFields = (item: any, setItem: (item: any) => void) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
                <Label htmlFor="title">Title *</Label>
                <Input id="title" value={item.title || ''} onChange={(e) => setItem({ ...item, title: e.target.value })} />
            </div>
            <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" value={item.category || item.platform || ''} onChange={(e) => setItem({ ...item, category: e.target.value, platform: e.target.value })} />
            </div>
            <div>
                <Label htmlFor="image-url">Image URL</Label>
                <Input id="image-url" value={item.imageUrl || item.thumbnail || ''} onChange={(e) => setItem({ ...item, imageUrl: e.target.value, thumbnail: e.target.value })} />
            </div>
            <div className="md:col-span-2">
                <Label htmlFor="link-url">Link/URL</Label>
                <Input id="link-url" value={item.link || item.url || ''} onChange={(e) => setItem({ ...item, link: e.target.value, url: e.target.value })} />
            </div>
            <div className="md:col-span-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea id="description" value={item.description || item.content || item.excerpt || ''} onChange={(e) => setItem({ ...item, description: e.target.value, content: e.target.value, excerpt: e.target.value })} />
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-foreground">Content Management</h2>
                <Button onClick={() => setAddFormOpen(true)}><Plus className="w-4 h-4 mr-2" /> Add Content</Button>
            </div>
            
            <div className="flex space-x-2 overflow-x-auto pb-2">
                {contentTypes.map((type) => (
                    <Button
                        key={type.id}
                        variant={selectedContentType === type.id ? 'default' : 'outline'}
                        onClick={() => setSelectedContentType(type.id)}
                        className="shrink-0"
                    >
                        {type.label}
                    </Button>
                ))}
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="px-6 py-4">Content</TableHead>
                                <TableHead className="px-6 py-4">Category</TableHead>
                                <TableHead className="px-6 py-4">Stats</TableHead>
                                <TableHead className="px-6 py-4">Date</TableHead>
                                <TableHead className="px-6 py-4">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                         <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8">
                                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                        <p className="mt-2 text-muted-foreground">Loading...</p>
                                    </TableCell>
                                </TableRow>
                            ) : activeContent.length > 0 ? (
                                activeContent.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-muted/50">
                                        <TableCell className="px-6 py-4">
                                            <div className="flex items-center space-x-3 max-w-sm">
                                                {(item.imageUrl || item.thumbnail) && (
                                                    <Image
                                                        src={item.imageUrl || item.thumbnail}
                                                        alt={item.title || 'Content image'}
                                                        width={48}
                                                        height={48}
                                                        className="w-12 h-12 object-cover rounded-lg"
                                                    />
                                                )}
                                                <div>
                                                    <h3 className="text-sm font-medium text-foreground line-clamp-1">{item.title}</h3>
                                                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description || item.content || item.excerpt}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-sm text-foreground">{item.category || item.platform || 'General'}</TableCell>
                                        <TableCell className="px-6 py-4 text-sm text-muted-foreground">{getStats(item, selectedContentType)}</TableCell>
                                        <TableCell className="px-6 py-4 text-sm text-muted-foreground">{item.published_at ? new Date(item.published_at.seconds * 1000).toLocaleDateString() : 'N/A'}</TableCell>
                                        <TableCell className="px-6 py-4">
                                            <div className="flex space-x-2">
                                                <Button variant="ghost" size="icon" onClick={() => setEditingItem(item)} className="text-primary hover:text-primary/80">
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item.id)} className="text-destructive hover:text-destructive/80">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                        No content found for this category.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Edit/Add Dialog */}
            <Dialog open={isAddFormOpen || !!editingItem} onOpenChange={(isOpen) => {
                if (!isOpen) {
                    setEditingItem(null);
                    setAddFormOpen(false);
                    setNewItem({});
                }
            }}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{editingItem ? 'Edit' : 'Add'} {selectedContentType}</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        {editingItem ? renderDialogFields(editingItem, setEditingItem) : renderDialogFields(newItem, setNewItem)}
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={editingItem ? handleEditContent : handleAddContent} disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ContentManagementTab;
