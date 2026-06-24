"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import {
  UserPlus,
  IdCard,
  FileText,
  MapPin,
  Phone,
  Users,
  ClipboardList,
  ShieldCheck,
  StickyNote,
  Paperclip,
  History,
  Pencil,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  CornerDownLeft,
} from "lucide-react";

type Section = {
  id: string;
  number: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  intro: string;
  body: React.ReactNode;
};

const sections: Section[] = [
  {
    id: "inicio",
    number: "01",
    title: "Acessando o Cadastro",
    icon: UserPlus,
    intro:
      "Para realizar vendas, compras e demais operações no sistema, é indispensável que a Pessoa — cliente ou fornecedor — esteja cadastrada.",
    body: (
      <div className="space-y-4 text-[15px] leading-relaxed text-foreground/85">
        <p>
          Acesse o menu <Pill>Cadastros &rsaquo; Pessoa</Pill>. A tela inicial lista todos os
          cadastros existentes e, na parte superior, traz filtros que ajudam a localizar
          rapidamente um registro já criado.
        </p>
        <p>
          Para incluir um novo registro, clique em <Pill tone="brand">Adicionar</Pill>. O sistema
          abrirá a tela de inclusão de dados.
        </p>
      </div>
    ),
  },
  {
    id: "informacoes-iniciais",
    number: "02",
    title: "Informações Iniciais",
    icon: IdCard,
    intro:
      "No início do cadastro, é necessário classificar a pessoa. Essa escolha define quais campos o sistema apresentará.",
    body: (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <TypeCard
            title="Pessoa Física"
            fields={[
              "Nome",
              "Apelido",
              "CPF",
              "Identidade",
              "Data de Emissão",
              "Órgão Emissor + UF",
              "Inscrição Estadual",
              "Finalidade",
            ]}
          />
          <TypeCard
            title="Pessoa Jurídica"
            fields={["Nome", "Nome Fantasia / Apelido", "CNPJ", "Inscrição Estadual", "Finalidade"]}
            highlight
          />
          <TypeCard
            title="Estrangeira"
            fields={["Nome", "Identificação Estrangeira"]}
          />
        </div>
        <Callout tone="brand" icon={Sparkles}>
          O campo <strong>Finalidade</strong> indica se a empresa será consumidora final ou se fará
          revenda. Isso impacta diretamente nos cálculos de tributação diferenciada.
        </Callout>
        <Callout icon={CheckCircle2}>
          Apenas campos marcados com <span className="font-semibold text-brand">*</span> são
          obrigatórios.
        </Callout>
      </div>
    ),
  },
  {
    id: "basico",
    number: "03",
    title: "Aba Básico",
    icon: FileText,
    intro:
      "Os campos variam conforme o tipo de pessoa. Aqui são definidos dados pessoais, limites de crédito e papéis no sistema.",
    body: (
      <div className="space-y-5">
        <FieldGrid
          items={[
            "Sexo",
            "Estado Civil",
            "Data de Nascimento",
            "Escolaridade",
            "Naturalidade",
            "Receita e Despesa",
            "Limite de Crédito Mensal",
            "Limite de Crédito Total",
            "Data de Fundação",
            "Cliente",
            "Fornecedor",
            "Ativo",
          ]}
        />
        <Callout tone="brand" icon={Users}>
          Uma mesma pessoa pode ser cadastrada simultaneamente como{" "}
          <strong>Cliente e Fornecedor</strong>, utilizando o mesmo registro para vendas e compras.
        </Callout>
      </div>
    ),
  },
  {
    id: "enderecos",
    number: "04",
    title: "Aba Endereços",
    icon: MapPin,
    intro:
      "Permite cadastrar um ou mais endereços, marcar o principal e registrar características de moradia.",
    body: (
      <div className="space-y-5">
        <StepList
          items={[
            "Marque o endereço Principal usando o botão correspondente.",
            "Defina o Tipo: Comercial, Entrega, Residencial ou Outros.",
            "Informe o CEP — UF, Cidade, Bairro e Logradouro são preenchidos automaticamente.",
            "Caso o logradouro não exista, preencha manualmente. Novos CEPs podem ser cadastrados em Configurações > Endereços > CEP.",
            "Informe Tipo de Moradia, Tempo de Moradia e Rota de Cobrança, quando aplicável.",
            "Use Adicionar Endereço para registrar mais de um endereço no mesmo cadastro.",
          ]}
        />
        <div className="grid gap-3 sm:grid-cols-5">
          {["Própria", "Alugada", "Financiada", "Familiares", "Cedida"].map((t) => (
            <div
              key={t}
              className="rounded-xl border border-border bg-card px-4 py-3 text-center text-sm font-medium text-foreground/80 shadow-soft"
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "contatos",
    number: "05",
    title: "Aba Contatos",
    icon: Phone,
    intro:
      "Centraliza telefone, celular, e-mail e demais meios eletrônicos de comunicação com a pessoa.",
    body: (
      <div className="space-y-4">
        <p className="text-[15px] leading-relaxed text-foreground/85">
          Na coluna <Pill>Informação</Pill> selecione o tipo de contato e, ao lado, em{" "}
          <Pill>Contato</Pill>, informe o dado correspondente. Repita quantas vezes for necessário.
        </p>
        <MiniTable
          headers={["Informação", "Contato"]}
          rows={[
            ["Telefone Residencial", "(11) 3000-0000"],
            ["Celular / WhatsApp", "(11) 90000-0000"],
            ["E-mail", "cliente@email.com"],
          ]}
        />
      </div>
    ),
  },
  {
    id: "referencias",
    number: "06",
    title: "Aba Referências",
    icon: Users,
    intro:
      "Registre referências do tipo Particular, Comercial, Pessoal ou Filiação para apoiar a análise de crédito.",
    body: (
      <MiniTable
        headers={["Informação (Nome)", "Contato"]}
        rows={[
          ["Maria Silva — Pessoal", "(11) 98888-1234"],
          ["Móveis Bom Preço — Comercial", "(11) 3222-4567"],
          ["João Souza — Filiação", "(11) 97777-9999"],
        ]}
      />
    ),
  },
  {
    id: "complementares",
    number: "07",
    title: "Informações Complementares",
    icon: ClipboardList,
    intro: "Dados adicionais que apoiam a tomada de decisão do crédito.",
    body: (
      <div className="grid gap-4 md:grid-cols-2">
        <InfoBlock
          title="Sobre a Pessoa"
          items={["Renda Comprovada", "Ocupação", "Número do Benefício"]}
        />
        <InfoBlock
          title="Sobre o Cônjuge"
          items={["Profissão", "Empresa", "Data de Admissão"]}
        />
      </div>
    ),
  },
  {
    id: "avalistas",
    number: "08",
    title: "Aba Avalistas",
    icon: ShieldCheck,
    intro: "Exibe os vínculos como avalista relacionados a este cadastro.",
    body: (
      <div className="grid gap-4 md:grid-cols-2">
        <LineCard
          label="Linha 1"
          title="Avalista de outros clientes"
          text="Vendas em que esta pessoa figurou como avalista de outro cliente."
        />
        <LineCard
          label="Linha 2"
          title="Vendas com avalistas vinculados"
          text="Vendas deste cadastro nas quais foi exigido avalista."
        />
      </div>
    ),
  },
  {
    id: "observacoes",
    number: "09",
    title: "Aba Observações",
    icon: StickyNote,
    intro: "Registre apontamentos relevantes sobre a pessoa.",
    body: (
      <Callout tone="warning" icon={StickyNote}>
        Uma observação registrada <strong>não pode ser editada nem excluída</strong>. Ela fica
        disponível apenas para consulta no <em>Histórico de Observações</em>. É possível cadastrar
        várias observações no mesmo registro.
      </Callout>
    ),
  },
  {
    id: "lgpd",
    number: "10",
    title: "Contrato LGPD",
    icon: ShieldCheck,
    intro: "Conformidade com a Lei Geral de Proteção de Dados.",
    body: (
      <div className="space-y-3">
        <StepList
          items={[
            "Visualize o texto da lei referente ao contrato.",
            "Marque a opção informando que o cliente assinou o termo.",
            "Realize o download do documento para impressão e coleta da assinatura física.",
          ]}
        />
      </div>
    ),
  },
  {
    id: "anexos",
    number: "11",
    title: "Aba Anexos",
    icon: Paperclip,
    intro:
      "Utilize para incluir cópias de documentos, contratos e demais arquivos que complementam o cadastro.",
    body: (
      <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-8 text-center">
        <Paperclip className="mx-auto h-8 w-8 text-brand" />
        <p className="mt-3 text-sm text-muted-foreground">
          Arraste documentos digitalizados ou faça upload — RG, comprovantes, contratos.
        </p>
      </div>
    ),
  },
  {
    id: "historico",
    number: "12",
    title: "Aba Histórico",
    icon: History,
    intro:
      "Após finalizar o cadastro, esta aba centraliza todas as movimentações vinculadas à pessoa.",
    body: (
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {[
          "Consulta Financeira",
          "Documentos",
          "Limites de Crédito",
          "Orçamentos",
          "Pedidos de Compra",
          "Assistência Técnica",
          "Lançamento de Crédito",
          "Análise de Crédito",
          "Controle de Cobrança",
          "Consultas SPC",
          "Contatos (CRM)",
        ].map((i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground/80 shadow-soft"
          >
            <ArrowRight className="h-3.5 w-3.5 text-brand" />
            {i}
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "alterar-excluir",
    number: "13",
    title: "Alterar e Excluir",
    icon: Pencil,
    intro:
      "Como editar, inativar ou excluir um cadastro existente — e o que fazer quando há movimentações vinculadas.",
    body: (
      <div className="space-y-4">
        <StepList
          items={[
            "Para editar, clique sobre o nome da pessoa na tela principal: o registro abrirá para edição ou exclusão.",
            "Se houver movimentações vinculadas, o sistema impede a exclusão e exibe uma mensagem — nesse caso, inative o cadastro.",
            "Use Imprimir Cadastro ao final da tela para coletar a assinatura do cliente confirmando os dados.",
          ]}
        />
      </div>
    ),
  },
];

type Slide =
  | { kind: "cover" }
  | { kind: "section"; section: Section; index: number }
  | { kind: "outro" };

export default function Index() {
  const slides: Slide[] = [
    { kind: "cover" },
    ...sections.map((section, index) => ({ kind: "section" as const, section, index })),
    { kind: "outro" },
  ];
  const total = slides.length;

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const go = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(total - 1, next));
      setDirection(clamped >= current ? 1 : -1);
      setCurrent(clamped);
    },
    [current, total],
  );

  const next = useCallback(() => go(current + 1), [current, go]);
  const prev = useCallback(() => go(current - 1), [current, go]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;

      if (e.key === "Enter" || e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp" || e.key === "Backspace") {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        e.preventDefault();
        go(0);
      } else if (e.key === "End") {
        e.preventDefault();
        go(total - 1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, go, total]);

  const progress = ((current + 1) / total) * 100;
  const slide = slides[current];

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background paper-grain">
      {/* progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-border/60">
        <motion.div
          className="h-full origin-left gradient-warm"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* ambient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute -top-32 -right-24 h-[460px] w-[460px] rounded-full bg-brand/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-[380px] w-[380px] rounded-full bg-accent/40 blur-3xl" />
      </div>

      {/* top bar */}
      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-6 sm:pt-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-warm text-brand-foreground shadow-elegant">
            <span className="font-display text-lg font-bold">F</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-foreground">Famol Móveis e Eletros</div>
            <div className="text-xs text-muted-foreground">Equipe de Crédito</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Slide {current + 1} / {total}
          </span>
        </div>
      </header>

      {/* slide area */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-6 py-8 sm:py-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-5xl"
          >
            {slide.kind === "cover" && <CoverSlide onStart={next} />}
            {slide.kind === "section" && (
              <SectionSlide section={slide.section} index={slide.index} total={sections.length} />
            )}
            {slide.kind === "outro" && <OutroSlide onRestart={() => go(0)} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* footer controls */}
      <footer className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 pb-6 sm:pb-8">
        <button
          onClick={prev}
          disabled={current === 0}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-sm font-medium text-foreground/80 backdrop-blur transition-colors hover:bg-card disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" /> Anterior
        </button>

        <div className="hidden items-center gap-1.5 sm:flex">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Ir para slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === current
                  ? "w-6 bg-brand"
                  : "w-1.5 bg-border hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1.5 text-[11px] uppercase tracking-widest text-muted-foreground md:inline-flex">
            <kbd className="inline-flex h-5 items-center gap-1 rounded border border-border bg-card px-1.5 font-mono text-[10px]">
              <CornerDownLeft className="h-3 w-3" /> Enter
            </kbd>
            avançar
          </span>
          <button
            onClick={next}
            disabled={current === total - 1}
            className="group inline-flex items-center gap-2 rounded-full gradient-warm px-5 py-2 text-sm font-semibold text-brand-foreground shadow-elegant transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            Próximo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </footer>
    </div>
  );
}

/* ---------- slide layouts ---------- */

function CoverSlide({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-center sm:text-left">
      <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand-soft/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
        <Sparkles className="h-3.5 w-3.5" /> Guia Interativo
      </span>
      <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] text-ink sm:text-6xl md:text-7xl">
        Cadastro de <span className="italic text-brand">Pessoa</span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground/75 sm:mx-0">
        Um passo a passo completo para a equipe de Crédito — do primeiro acesso ao histórico de
        movimentações, com cada aba explicada em detalhes.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-3 sm:justify-start">
        <button
          onClick={onStart}
          className="group inline-flex items-center gap-2 rounded-full gradient-warm px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-elegant transition-transform hover:-translate-y-0.5"
        >
          Começar o treinamento
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2.5 text-xs font-medium text-muted-foreground backdrop-blur">
          <kbd className="inline-flex h-5 items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px]">
            <CornerDownLeft className="h-3 w-3" /> Enter
          </kbd>
          para avançar
        </span>
      </div>

      <div className="mx-auto mt-12 grid max-w-xl grid-cols-3 gap-6 sm:mx-0">
        {[
          ["13", "Seções"],
          ["3", "Tipos de Pessoa"],
          ["11", "Abas do Cadastro"],
        ].map(([n, l]) => (
          <div key={l}>
            <div className="font-display text-4xl font-semibold text-ink">{n}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionSlide({
  section,
  index,
  total,
}: {
  section: Section;
  index: number;
  total: number;
}) {
  const Icon = section.icon;
  return (
    <section className="flex max-h-[78vh] flex-col">
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand shadow-soft">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xs font-semibold tracking-widest text-brand">
              {section.number}
            </span>
            <span className="h-px flex-1 bg-border" />
            <span className="font-mono text-[11px] text-muted-foreground">
              {index + 1} / {total}
            </span>
          </div>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
            {section.title}
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-foreground/75">
            {section.intro}
          </p>
        </div>
      </div>
      <div className="overflow-y-auto pr-1 ml-0 lg:ml-16">{section.body}</div>
    </section>
  );
}

function OutroSlide({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-soft sm:p-14">
      <Sparkles className="mx-auto h-7 w-7 text-brand" />
      <h2 className="mt-4 font-display text-4xl font-semibold text-ink">Treinamento concluído</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Mantenha este guia como referência rápida sempre que precisar revisar o fluxo de cadastro.
        Em caso de dúvidas, procure a supervisão da equipe de Crédito.
      </p>
      <button
        onClick={onRestart}
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground/80 transition-colors hover:bg-secondary"
      >
        <ArrowLeft className="h-4 w-4" /> Recomeçar do início
      </button>
      <div className="mt-8 text-xs uppercase tracking-widest text-muted-foreground">
        Famol Móveis e Eletros · Equipe de Crédito
      </div>
    </div>
  );
}


function Pill({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "brand";
}) {
  const cls =
    tone === "brand"
      ? "bg-brand text-brand-foreground"
      : "bg-secondary text-secondary-foreground border border-border";
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[13px] font-medium ${cls}`}
    >
      {children}
    </span>
  );
}

function TypeCard({
  title,
  fields,
  highlight,
}: {
  title: string;
  fields: string[];
  highlight?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className={`rounded-2xl border p-5 shadow-soft transition-shadow hover:shadow-elegant ${
        highlight ? "border-brand/40 bg-brand-soft/40" : "border-border bg-card"
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
        {highlight && (
          <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-foreground">
            CNPJ
          </span>
        )}
      </div>
      <ul className="space-y-1.5">
        {fields.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-foreground/75">
            <span className="h-1 w-1 rounded-full bg-brand" />
            {f}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function Callout({
  children,
  tone = "default",
  icon: Icon,
}: {
  children: React.ReactNode;
  tone?: "default" | "brand" | "warning";
  icon?: React.ComponentType<{ className?: string }>;
}) {
  const tones: Record<string, string> = {
    default: "border-border bg-card",
    brand: "border-brand/30 bg-brand-soft/50",
    warning: "border-amber-600/30 bg-amber-50/80",
  };
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border p-4 text-[14.5px] leading-relaxed text-foreground/85 ${tones[tone]}`}
    >
      {Icon && <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />}
      <div>{children}</div>
    </div>
  );
}

function FieldGrid({ items }: { items: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((i) => (
        <div
          key={i}
          className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground/80 shadow-soft"
        >
          {i}
        </div>
      ))}
    </div>
  );
}

function StepList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-3">
      {items.map((t, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-soft"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand font-mono text-[11px] font-bold text-brand-foreground">
            {i + 1}
          </span>
          <span className="text-[14.5px] leading-relaxed text-foreground/85">{t}</span>
        </motion.li>
      ))}
    </ol>
  );
}

function MiniTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
      <div className="grid grid-cols-2 bg-secondary/60 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {headers.map((h) => (
          <div key={h}>{h}</div>
        ))}
      </div>
      {rows.map((r, i) => (
        <div
          key={i}
          className={`grid grid-cols-2 px-4 py-3 text-sm text-foreground/85 ${
            i !== rows.length - 1 ? "border-b border-border" : ""
          }`}
        >
          <div className="font-medium">{r[0]}</div>
          <div className="text-muted-foreground">{r[1]}</div>
        </div>
      ))}
    </div>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <h3 className="mb-3 font-display text-lg font-semibold text-ink">{title}</h3>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
            <CheckCircle2 className="h-4 w-4 text-brand" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

function LineCard({ label, title, text }: { label: string; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="text-[11px] font-semibold uppercase tracking-widest text-brand">{label}</div>
      <div className="mt-1 font-display text-lg font-semibold text-ink">{title}</div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}
