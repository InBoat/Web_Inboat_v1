import os
import urllib.request
import urllib.error
import json

supabase_url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
supabase_key = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")

if not supabase_url or not supabase_key:
    print("ERRO: Variaveis de ambiente do Supabase nao encontradas.")
    exit(1)

print(f"Conectando ao Supabase: {supabase_url}")

headers = {
    "Content-Type": "application/json",
    "apikey": supabase_key,
    "Authorization": f"Bearer {supabase_key}",
    "Prefer": "return=representation"
}

def post(endpoint, data):
    url = f"{supabase_url}/rest/v1/{endpoint}"
    payload = json.dumps(data).encode("utf-8")
    req = urllib.request.Request(url, data=payload, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.status, json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode()

# Embarcacoes
embarcacoes = [
    {
        "nome": "Triton 380 HT",
        "descricao": "A Triton 380 HT é uma lancha de alto padrão, perfeita para passeios em família e pesca esportiva. Com design moderno e acabamento premium, oferece conforto e desempenho excepcionais. Equipada com dois motores Mercury Verado 300HP.",
        "tipo": "lancha",
        "capacidade": 12,
        "comprimento": "11.6m",
        "motor": "2x Mercury Verado 300HP",
        "velocidade_max": "45 nós",
        "localizacao": "Marina da Glória, Rio de Janeiro",
        "preco_mensal": 275000.00,
        "preco_anual": 1100000.00,
        "disponivel": True,
        "destaque": True,
        "imagens": ["/boats/triton-380-1.jpg", "/boats/triton-380-2.jpg"],
        "caracteristicas": ["2x Mercury Verado 300HP", "Velocidade máx: 45 nós", "Capacidade: 12 pessoas", "11.6 metros"]
    },
    {
        "nome": "Fishing 39 Raptor",
        "descricao": "Lancha de pesca esportiva equipada com três motores Yamaha 300HP. Ideal para pescadores exigentes que buscam performance e autonomia. Possui torre de pesca, cadeiras de combate e viveiro para iscas.",
        "tipo": "pesca",
        "capacidade": 10,
        "comprimento": "12m",
        "motor": "3x Yamaha 300HP",
        "velocidade_max": "52 nós",
        "localizacao": "Marina Itanhangá, Guarujá",
        "preco_mensal": 320000.00,
        "preco_anual": 1280000.00,
        "disponivel": True,
        "destaque": True,
        "imagens": ["/boats/fishing-39-1.jpg", "/boats/fishing-39-2.jpg"],
        "caracteristicas": ["3x Yamaha 300HP", "Velocidade máx: 52 nós", "Torre de pesca", "12 metros"]
    },
    {
        "nome": "NX 340 Americana",
        "descricao": "A NX 340 Americana combina elegância e versatilidade. Perfeita para day cruises e entretenimento, possui amplo solário, área gourmet com churrasqueira e som premium.",
        "tipo": "lancha",
        "capacidade": 14,
        "comprimento": "10.4m",
        "motor": "2x Mercury 250HP",
        "velocidade_max": "40 nós",
        "localizacao": "Yacht Club Ilhabela",
        "preco_mensal": 245000.00,
        "preco_anual": 980000.00,
        "disponivel": True,
        "destaque": False,
        "imagens": ["/boats/nx-340-1.jpg", "/boats/nx-340-2.jpg"],
        "caracteristicas": ["2x Mercury 250HP", "Velocidade máx: 40 nós", "Solário amplo", "10.4 metros"]
    },
    {
        "nome": "Mares 38 Fishing",
        "descricao": "Embarcação de pesca esportiva de alta performance. Com três motores Suzuki 350HP, oferece velocidade e estabilidade para expedições de pesca.",
        "tipo": "pesca",
        "capacidade": 8,
        "comprimento": "11.5m",
        "motor": "3x Suzuki 350HP",
        "velocidade_max": "58 nós",
        "localizacao": "Marina Astúrias, Guarujá",
        "preco_mensal": 380000.00,
        "preco_anual": 1520000.00,
        "disponivel": True,
        "destaque": False,
        "imagens": ["/boats/mares-38-1.jpg", "/boats/mares-38-2.jpg"],
        "caracteristicas": ["3x Suzuki 350HP", "Velocidade máx: 58 nós", "Equipamentos profissionais", "11.5 metros"]
    }
]

# FAQs
faqs = [
    {"pergunta": "O que é a InBoat e qual seu papel?", "resposta": "A InBoat atua como administradora do sistema de cotas náuticas. Nossa função é cuidar de toda a gestão da embarcação: reservas via aplicativo próprio, manutenção preventiva e corretiva, limpeza, documentação, seguro, equipe de apoio e acompanhamento financeiro.", "ordem": 1, "ativo": True},
    {"pergunta": "Como funciona a compra compartilhada?", "resposta": "O modelo de multipropriedade divide a embarcação em quatro cotas. Cada cotista é dono de 25% do bem, com direito real sobre a sua fração. Esse formato reduz em até 85% o custo de aquisição e em até 90% as despesas de manutenção.", "ordem": 2, "ativo": True},
    {"pergunta": "Por que adquirir uma embarcação neste formato?", "resposta": "Barcos, assim como aviões, carros de luxo e casas de veraneio, costumam ter uso eventual e custos de manutenção elevados. Ao optar pela propriedade compartilhada, o cotista usufrui do bem de forma inteligente, com economia, praticidade e total suporte.", "ordem": 3, "ativo": True},
    {"pergunta": "Quem é, de fato, o dono da embarcação?", "resposta": "A propriedade é dividida entre os cotistas. Cada um possui 25% da embarcação e pode vender, transferir ou ceder sua cota quando desejar.", "ordem": 4, "ativo": True},
    {"pergunta": "Como funciona a reserva de uso?", "resposta": "O agendamento é feito em um sistema online disponível 24 horas. Basta selecionar a data desejada e o sistema notifica os demais cotistas.", "ordem": 5, "ativo": True},
    {"pergunta": "Existe limite de utilização?", "resposta": "Não. O uso é ilimitado, desde que respeitado o sistema de agendamento e disponibilidade.", "ordem": 6, "ativo": True},
    {"pergunta": "Quais são os custos fixos do cotista?", "resposta": "As despesas incluem: Estadia na marina, Limpeza e higienização, Documentação, Seguro total da embarcação, Rastreador, Marinheiro de apoio e Taxa de administração InBoat.", "ordem": 7, "ativo": True},
    {"pergunta": "Como funciona a manutenção e quem paga?", "resposta": "As manutenções seguem o manual do fabricante e são acompanhadas por equipe credenciada. Os custos são rateados entre os cotistas, de acordo com a proporção de uso.", "ordem": 8, "ativo": True},
    {"pergunta": "E se um cotista não pagar sua parte?", "resposta": "A InBoat antecipa os valores e assume a cobrança do inadimplente. Isso significa que os demais cotistas não são impactados por eventuais atrasos.", "ordem": 9, "ativo": True},
    {"pergunta": "Posso vender minha cota a qualquer momento?", "resposta": "Sim. Como proprietário da fração, o cotista tem liberdade para comercializar sua parte quando desejar.", "ordem": 10, "ativo": True},
    {"pergunta": "Preciso de habilitação para usar o barco?", "resposta": "Sim, a habilitação náutica é necessária. Porém, caso o cotista não possua, pode contratar marinheiros credenciados da InBoat para conduzir a embarcação.", "ordem": 11, "ativo": True},
]

print("\n--- Inserindo embarcacoes ---")
status, result = post("embarcacoes", embarcacoes)
if status in [200, 201]:
    print(f"OK: {len(result)} embarcacoes inseridas.")
else:
    print(f"ERRO {status}: {result}")

print("\n--- Inserindo FAQs ---")
status, result = post("faqs", faqs)
if status in [200, 201]:
    print(f"OK: {len(result)} FAQs inseridas.")
else:
    print(f"ERRO {status}: {result}")

print("\nSeed concluido!")
