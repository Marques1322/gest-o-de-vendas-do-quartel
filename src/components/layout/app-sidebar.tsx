import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, ShoppingCart, History, Users, Package, HandCoins,
  Wallet, BarChart3, Settings, Shield,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export const NAV = [
  { group: "Operação", items: [
    { title: "Dashboard", url: "/", icon: LayoutDashboard },
    { title: "Nova Venda", url: "/nova-venda", icon: ShoppingCart },
    { title: "Histórico de Vendas", url: "/historico", icon: History },
  ]},
  { group: "Cadastros", items: [
    { title: "Militares", url: "/militares", icon: Users },
    { title: "Produtos e Estoque", url: "/produtos", icon: Package },
  ]},
  { group: "Financeiro", items: [
    { title: "Fiado / A Receber", url: "/fiado", icon: HandCoins },
    { title: "Financeiro", url: "/financeiro", icon: Wallet },
    { title: "Relatórios", url: "/relatorios", icon: BarChart3 },
  ]},
  { group: "Sistema", items: [
    { title: "Configurações", url: "/configuracoes", icon: Settings },
  ]},
] as const;

export function AppSidebar() {
  const { setOpenMobile } = useSidebar();
  const path = useRouterState({ select: (r) => r.location.pathname });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-1 py-2">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Shield className="size-5" />
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-bold text-sidebar-primary">Gestão de Vendas</p>
            <p className="truncate text-xs text-sidebar-foreground/60">Cantina do quartel</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {NAV.map((g) => (
          <SidebarGroup key={g.group}>
            <SidebarGroupLabel className="text-sidebar-foreground/50">{g.group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {g.items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={path === item.url} tooltip={item.title}>
                      <Link to={item.url} onClick={() => setOpenMobile(false)}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-1 py-1">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-xs font-semibold text-sidebar-accent-foreground">
            HM
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-medium text-sidebar-primary">Administrador</p>
            <p className="truncate text-xs text-sidebar-foreground/60">Operador do caixa</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
