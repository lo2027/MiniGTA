"use client"

import { useState, useEffect, useRef, type KeyboardEvent } from "react"

// MS-DOS, Linux and Atari command responses
const commandResponses: Record<string, string[]> = {
  // MS-DOS commands
  dir: ["Volume in drive C has no label", "Directory of C:\\COMPUTERZ", "", " GAMES     <DIR>     01-02-26  10:30a", " HACKS     <DIR>     01-02-26  10:30a", " README.TXT    1,337  01-02-26  10:30a", "       1 file(s)        1,337 bytes", "       2 dir(s)    420,000,000 bytes free"],
  cls: ["[Screen cleared]"],
  ver: ["MS-DOS Version 6.22", "ComputerZ Gaming Edition"],
  help: ["Available commands:", "  dir    - List directory contents", "  cls    - Clear screen", "  ver    - Display version", "  type   - Display file contents", "  cd     - Change directory", "  ls     - List files (Linux)", "  pwd    - Print working directory", "  cat    - Display file contents", "  whoami - Display current user", "  uname  - System information", "  peek   - Atari PEEK memory", "  poke   - Atari POKE memory", "  list   - Atari LIST program"],
  type: ["COMPUTERZ GAMERS - Where hackers shop!", "The best graphics cards for the elite."],
  cd: ["C:\\COMPUTERZ>"],
  "cd..": ["C:\\>"],
  // Linux commands
  ls: ["drwxr-xr-x  games/", "drwxr-xr-x  hacks/", "-rw-r--r--  readme.txt", "-rwxr-xr-x  exploit.sh", "-rw-r--r--  passwords.db"],
  pwd: ["/home/root/computerz"],
  whoami: ["root"],
  uname: ["Linux computerz-kali 6.1.0-kali9-amd64 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux"],
  "uname -a": ["Linux computerz-kali 6.1.0-kali9-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.1.27-1kali1 (2024-05-30) x86_64 GNU/Linux"],
  cat: ["[*] ComputerZ Gamers - Elite Hardware", "[*] For those who demand the best", "[!] Warning: This system is monitored"],
  ps: ["  PID TTY          TIME CMD", "    1 ?        00:00:03 systemd", " 1337 pts/0    00:00:00 bash", " 9000 pts/0    00:00:00 nmap"],
  ifconfig: ["eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500", "        inet 192.168.1.100  netmask 255.255.255.0", "        ether de:ad:be:ef:ca:fe  txqueuelen 1000"],
  // Atari commands
  peek: ["PEEK(53248) = 255", "PEEK(53249) = 127", "PEEK(54272) = 0", "[Reading memory location...]"],
  poke: ["POKE 53248,0", "POKE 53249,255", "[Memory modified - Screen color changed!]"],
  list: ["10 REM COMPUTERZ GAMERS", "20 PRINT 'WELCOME HACKER'", "30 GOTO 20", "READY."],
  run: ["WELCOME HACKER", "WELCOME HACKER", "WELCOME HACKER", "Break in line 30"],
  load: ["LOADING FROM CASSETTE...", "FOUND: HACKGAME", "READY."],
  // Easter eggs
  hack: ["[!] INITIATING HACK SEQUENCE...", "[*] Bypassing firewall...", "[*] Injecting payload...", "[+] ACCESS GRANTED", "[!] Welcome to ComputerZ, elite hacker!"],
  matrix: ["[*] Entering the Matrix...", "Wake up, Neo...", "The Matrix has you...", "Follow the white rabbit."],
  "sudo rm -rf /": ["[!] Nice try, but we're not that stupid ;)", "[*] ComputerZ security protocols engaged"],
}

const hackCommands = [
  "root@kali:~# nmap -sV -sC 192.168.1.0/24",
  "[*] Scanning network... 254 hosts found",
  "root@kali:~# msfconsole -q",
  "msf6 > use exploit/multi/handler",
  "msf6 exploit(handler) > set PAYLOAD windows/meterpreter/reverse_tcp",
  "C:\\> dir /s /b *.txt",
  "[!] ALERT: Firewall bypass detected",
  "root@kali:~# airmon-ng start wlan0",
  "[+] Monitor mode enabled on wlan0mon",
  "root@kali:~# hashcat -m 0 -a 0 hash.txt rockyou.txt",
  "[*] Cracking MD5 hashes...",
  "C:\\Windows\\System32> netstat -ano",
  "[!] ALERT: Suspicious connection on port 4444",
  "root@kali:~# sqlmap -u 'http://target.com/id=1' --dbs",
  "[+] Database enumeration complete",
  "msf6 > search cve:2024",
  "[*] Found 127 matching exploits",
  "root@kali:~# hydra -l admin -P passwords.txt ssh://192.168.1.100",
  "[+] Login successful: admin:password123",
  "C:\\> systeminfo | findstr /B /C:'OS'",
  "[!] ALERT: Privilege escalation attempt",
  "root@kali:~# john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt",
  "[*] 3 password hashes cracked",
  "root@kali:~# nikto -h http://target.com",
  "[+] Web vulnerabilities detected: 12",
  "C:\\> wmic process list brief",
  "[!] ALERT: Malware signature detected",
  "root@kali:~# gobuster dir -u http://target.com -w common.txt",
  "[+] /admin found (Status: 200)",
  "msf6 > exploit",
  "[*] Meterpreter session 1 opened",
  "meterpreter > sysinfo",
  "[+] Computer: WIN-SERVER2022",
  "root@kali:~# wireshark -i eth0 -k",
  "[*] Capturing packets on eth0...",
  "C:\\> reg query HKLM\\SOFTWARE",
  "[!] ALERT: Registry modification detected",
  "root@kali:~# burpsuite &",
  "[*] Proxy intercepting traffic on 127.0.0.1:8080",
  "root@kali:~# enum4linux -a 192.168.1.50",
  "[+] SMB shares enumerated",
  "meterpreter > hashdump",
  "[+] Administrator:500:aad3b435b51404eeaad3b435b51404ee",
  "C:\\> tasklist /svc",
  "[!] ALERT: Keylogger process detected",
  "root@kali:~# setoolkit",
  "[*] Social Engineering Toolkit loaded",
  "root@kali:~# responder -I eth0",
  "[+] LLMNR/NBT-NS Poisoner started",
]

export default function HackConsole() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [lines, setLines] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [commandInput, setCommandInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    if (!trimmedCmd) return

    // Add command to history
    setCommandHistory(prev => [...prev, trimmedCmd])
    setHistoryIndex(-1)

    // Add user input line
    setLines(prev => [...prev, `root@computerz:~# ${cmd}`])

    // Find response - mark user command responses with special prefix for styling
    const response = commandResponses[trimmedCmd]
    if (response) {
      setLines(prev => [...prev, ...response.map(r => `>>>${r}`)])
    } else if (trimmedCmd === "clear" || trimmedCmd === "cls") {
      setLines([])
    } else {
      setLines(prev => [...prev, `>>>bash: ${trimmedCmd}: command not found`, ">>>Type 'help' for available commands"])
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(commandInput)
      setCommandInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex
        setHistoryIndex(newIndex)
        setCommandInput(commandHistory[commandHistory.length - 1 - newIndex] || "")
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCommandInput(commandHistory[commandHistory.length - 1 - newIndex] || "")
      } else {
        setHistoryIndex(-1)
        setCommandInput("")
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setLines((prev) => {
        const newLines = [...prev, hackCommands[currentIndex % hackCommands.length]]
        if (newLines.length > 50) {
          return newLines.slice(-50)
        }
        return newLines
      })
      setCurrentIndex((prev) => prev + 1)
    }, 400)

    return () => clearInterval(interval)
  }, [currentIndex])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  const getLineColor = (line: string) => {
    if (line.startsWith("[!] ALERT")) return "text-red-500 font-bold animate-pulse"
    if (line.startsWith("[+]")) return "text-green-400"
    if (line.startsWith("[*]")) return "text-cyan-400"
    if (line.startsWith("root@kali") || line.startsWith("msf6") || line.startsWith("meterpreter")) return "text-green-500"
    if (line.startsWith("C:\\")) return "text-yellow-400"
    return "text-green-300"
  }

  return (
    <>
      {/* Mini Console */}
      <div
        onClick={() => setIsFullscreen(true)}
        className="hidden sm:block relative w-56 md:w-80 lg:w-[420px] h-14 md:h-16 lg:h-20 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform border border-green-500/50 shadow-lg shadow-green-500/20"
        style={{ opacity: 0.6 }}
      >
        {/* Kali Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/kali-dragon-background.png')",
            opacity: 0.4,
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Console Content */}
        <div
          ref={!isFullscreen ? scrollRef : undefined}
          className="absolute inset-0 p-1 md:p-2 overflow-hidden font-mono text-[8px] md:text-[10px] lg:text-xs"
        >
          {lines.slice(-4).map((line, i) => (
            <div key={i} className={`truncate ${getLineColor(line)}`}>
              {line}
            </div>
          ))}
        </div>

        {/* Click hint */}
        <div className="absolute bottom-1 right-2 text-green-500/70 text-xs">
          Click to expand
        </div>
      </div>

      {/* Fullscreen Console */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() => setIsFullscreen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Console Window */}
          <div
            className="relative w-full max-w-5xl h-[80vh] rounded-xl overflow-hidden border-2 border-green-500 shadow-2xl shadow-green-500/30"
            style={{ opacity: 0.6 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Kali Background */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/kali-dragon-background.png')",
                opacity: 0.5,
              }}
            />
            <div className="absolute inset-0 bg-black/50" />

            {/* Window Header */}
            <div className="relative flex items-center justify-between px-4 py-2 bg-black/80 border-b border-green-500/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-green-400 font-mono text-sm">root@computerz-kali ~ HACK CONSOLE</span>
              <button
                onClick={() => setIsFullscreen(false)}
                className="text-green-500 hover:text-red-500 transition-colors text-xl font-bold"
              >
                X
              </button>
            </div>

            {/* Console Content */}
            <div
              ref={isFullscreen ? scrollRef : undefined}
              className="relative h-[calc(100%-100px)] p-4 overflow-y-auto font-mono text-sm scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-black"
            >
              {/* ASCII Art Header */}
              <pre className="text-green-500 mb-4 text-xs">
{`
 ██████╗ ██████╗ ███╗   ███╗██████╗ ██╗   ██╗████████╗███████╗██████╗ ███████╗
██╔════╝██╔═══██╗████╗ ████║██╔══██╗██║   ██║╚══██╔══╝██╔════╝██╔══██╗╚══███╔╝
██║     ██║   ██║██╔████╔██║██████╔╝██║   ██║   ██║   █████╗  ██████╔╝  ███╔╝ 
██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║   ██║   ██║   ██╔══╝  ██╔══██╗ ███╔╝  
╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ╚██████╔╝   ██║   ███████╗██║  ██║███████╗
 ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝      ╚═════╝    ╚═╝   ╚══════╝╚═╝  ╚═╝╚══════╝
                    [ HACK CONSOLE - SECURITY MONITORING ]
`}
              </pre>

              {lines.map((line, i) => (
                <div key={i} className={`mb-1 ${getLineColor(line)}`}>
                  {line}
                </div>
              ))}

              {/* Blinking cursor */}
              <span className="inline-block w-2 h-4 bg-green-500 animate-pulse ml-1" />
            </div>

            {/* Command Input */}
            <div className="relative border-t border-green-500/50 bg-black/80 px-4 py-3 flex items-center gap-2">
              <span className="text-green-500 font-mono text-sm">root@computerz:~#</span>
              <input
                ref={inputRef}
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono text-sm placeholder-green-700"
                placeholder="Type a command (try: help, dir, ls, hack, matrix)"
                autoFocus
              />
              <span className="w-2 h-4 bg-green-500 animate-pulse" />
            </div>
          </div>

          {/* Click outside hint */}
          <div className="absolute bottom-8 text-green-500/70 text-sm">
            Click outside to close | Type commands to interact
          </div>
        </div>
      )}
    </>
  )
}
