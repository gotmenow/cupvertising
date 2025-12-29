import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";

export default function TransactionForm({ onSubmit, open, onOpenChange }) {
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      type: "income",
      date: new Date().toISOString().split('T')[0]
    }
  });

  const type = watch("type");

  const onFormSubmit = (data) => {
    onSubmit({
      ...data,
      amount: parseFloat(data.amount)
    });
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-slate-900 hover:bg-slate-800 text-white">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onFormSubmit)} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title", { required: true })} placeholder="e.g. Q1 Sales" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount (£)</Label>
              <Input id="amount" type="number" step="0.01" {...register("amount", { required: true })} placeholder="0.00" />
            </div>
            <div className="grid gap-2">
              <Label>Type</Label>
              <Select onValueChange={(val) => setValue("type", val)} defaultValue="income">
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Category</Label>
            <Select onValueChange={(val) => setValue("category", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {type === 'income' ? (
                  <>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="advertising">Advertising Revenue</SelectItem>
                    <SelectItem value="other">Other Income</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="inventory">Inventory & Stock</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="logistics">Logistics & Delivery</SelectItem>
                    <SelectItem value="operational">Operational Costs</SelectItem>
                    <SelectItem value="salary">Salaries</SelectItem>
                    <SelectItem value="other">Other Expense</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" {...register("date", { required: true })} />
          </div>

          <Button type="submit" className="bg-slate-900 text-white hover:bg-slate-800">Save Transaction</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}