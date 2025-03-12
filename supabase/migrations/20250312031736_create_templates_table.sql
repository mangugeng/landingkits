-- Create templates table
create table public.templates (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    description text,
    blocks jsonb not null,
    status text not null check (status in ('draft', 'published')),
    subdomain text unique,
    custom_domain text unique,
    is_public boolean default false,
    views integer default 0,
    thumbnail text,
    user_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.templates enable row level security;

-- Create policies
create policy "Users can view their own templates"
    on public.templates for select
    using (auth.uid() = user_id);

create policy "Users can view published public templates"
    on public.templates for select
    using (status = 'published' and is_public = true);

create policy "Users can insert their own templates"
    on public.templates for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own templates"
    on public.templates for update
    using (auth.uid() = user_id);

create policy "Users can delete their own templates"
    on public.templates for delete
    using (auth.uid() = user_id);

-- Create function to increment views
create or replace function public.increment_views(row_id uuid)
returns integer
language sql
security definer
as $$
  update public.templates
  set views = views + 1
  where id = row_id
  returning views;
$$;
