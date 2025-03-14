<table border="1">
    <thead>
        <tr>
            <th style="font-weight: bold; font-size: 16px" align="center" colspan="5">LAPORAN PIUTANG</th>
        </tr>
        <tr>
            <th style="font-weight: bold; font-size: 14px; text-transform: uppercase" align="center" colspan="5">Periode {{ $periode }}</th>
        </tr>
        <tr>
            <th style="font-weight: bold" align="center">NO</th>
            <th style="font-weight: bold" align="center">PELANGGAN</th>
            <th style="font-weight: bold" align="center">TANGGAL</th>
            <th style="font-weight: bold" align="center">ALAMAT</th>
            <th style="font-weight: bold" align="center">PAKET INTERNET</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($datas as $key => $data)
        <tr>
            <td align="center">{{ ++$key }}</td>
            <td>{{ $data['nama'] }}</td>
            <td>{{ $data['tgl'] }}</td>
            <td>{{ $data['alamat'] }}</td>
            <td>{{ $data['paket'] }}</td>
        </tr>
        @endforeach
    </tbody>
</table>
