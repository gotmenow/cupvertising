import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

import FinanceStats from "../components/finance/FinanceStats";
import TransactionForm from "../components/finance/TransactionForm";
import RecentTransactions from "../components/finance/RecentTransactions";

export default function Finance() {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [user, setUser] = React.useState(null);
  const [checkingAuth, setCheckingAuth] = React.useState(true);

  React.useEffect(() => {
    base44.auth.me().then(u => {
      setUser(u);
      setCheckingAuth(false);
    }).catch(() => {
      setUser(null);
      setCheckingAuth(false);
    });
  }, []);

  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => base44.entities.Transaction.list({ sort: { date: -1 } }),
    initialData: [],
    enabled: !!user && user.role === 'admin',
  });

  if (checkingAuth) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-slate-500" /></div>;

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Access Restricted</h1>
        <p className="text-slate-600 mb-6">This page is only accessible to administrators.</p>
        <Button onClick={() => base44.auth.redirectToLogin(window.location.href)}>Login as Admin</Button>
      </div>
    );
  }

  const createTransaction = useMutation({
    mutationFn: (data) => base44.entities.Transaction.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      setIsFormOpen(false);
    },
  });

  const deleteTransaction = useMutation({
    mutationFn: (id) => base44.entities.Transaction.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });

  // Prepare Chart Data
  const chartData = React.useMemo(() => {
    const grouped = {};
    // Sort transactions by date ascending for chart
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    sorted.forEach(t => {
      const date = t.date;
      if (!grouped[date]) grouped[date] = { date, income: 0, expense: 0 };
      if (t.type === 'income') grouped[date].income += t.amount;
      if (t.type === 'expense') grouped[date].expense += t.amount;
    });
    
    return Object.values(grouped);
  }, [transactions]);

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-slate-500" /></div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Finance Planning</h1>
            <p className="text-slate-500">Monitor revenue, expenses, and profitability.</p>
          </div>
          <TransactionForm 
            open={isFormOpen} 
            onOpenChange={setIsFormOpen} 
            onSubmit={(data) => createTransaction.mutate(data)} 
          />
        </div>

        <FinanceStats transactions={transactions} />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Legend />
                      <Bar dataKey="income" name="Income" fill="#16a34a" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="expense" name="Expense" fill="#dc2626" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <RecentTransactions transactions={transactions} onDelete={(id) => deleteTransaction.mutate(id)} />
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Budgeting</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                    <h4 className="font-semibold text-amber-800 mb-1">Target Monthly Profit</h4>
                    <p className="text-2xl font-bold text-amber-600">£15,000</p>
                    <p className="text-xs text-amber-700 mt-2">Goal for next quarter to support in-house manufacturing expansion.</p>
                 </div>
                 
                 <div className="p-4 bg-teal-50 rounded-lg border border-teal-100">
                    <h4 className="font-semibold text-teal-800 mb-1">Cost Savings</h4>
                    <p className="text-2xl font-bold text-teal-600">£2,400</p>
                    <p className="text-xs text-teal-700 mt-2">Saved this month via local manufacturing partnerships.</p>
                 </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}